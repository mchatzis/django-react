import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { EmployeeList } from './EmployeeList'
import { EmployeesApi } from '../api-client/apis/EmployeesApi'
import { Configuration, HTTPHeaders } from '../api-client/runtime'
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

  function fetch_emp_list(){
    apiInst.employeesList()
    .then(data => setEmpData(data))
    .catch(err => console.error(err));
  }

  useEffect(fetch_emp_list,[])

  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  return (
    <>
      <h4>List of employees:</h4>
      <EmployeeList emp_list={empData}/>
      <h4>Add new employee:</h4>
      <CreateEmployeeWidget 
          apiInst={apiInst} 
          fetch_emp_list={fetch_emp_list} 
          dep_choices={dep_choices}/>
    </>
  );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App apiInst={apiInst}/>)