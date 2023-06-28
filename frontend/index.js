import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { EmployeeList } from './EmployeeList'
import { EmployeesApi } from '../api-client/apis/EmployeesApi'
import { Configuration } from '../api-client/runtime'
import { CreateEmployeeWidget } from './EmployeeWidget'
import Cookies from 'js-cookie'

const apiInst = new EmployeesApi(
                  new Configuration(
                    {
                      basePath:'http://127.0.0.1:8000',
                      headers:{'X-CSRFToken':Cookies.get('csrftoken')},
                    },
                  )
)

function App({apiInst}){
  const [empData, setEmpData] = useState([])
  const [empError, setEmpError] = useState()

  useEffect(fetch_emp_list,[])

  function fetch_emp_list(){
    apiInst.employeesList()
    .then(res => setEmpData(res))
    .catch(err => {
      var code = err.response.status
      if (code === 403) {
            const msg = "Access denied. Login required."
            setEmpError(msg)
      }
      else{ 
        console.log(err)
        err.response.json()
        .then(msg => setErrors(msg.detail)) 
        }
      }
    );
  }

  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  const heading = <h4>List of employees:</h4>;
  let content = (
    <>
      {heading}
      <EmployeeList emp_list={empData}/>

      <h4>Add new employee:</h4>
      <CreateEmployeeWidget 
          apiInst={apiInst} 
          fetch_emp_list={fetch_emp_list} 
          dep_choices={dep_choices}/>
    </>
  )

  if (empError) {
    content = (
      <>
        {heading}
        <p>{empError}</p>
      </>
    );
  }

  return content;
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App apiInst={apiInst}/>)