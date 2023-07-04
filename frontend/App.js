import React, { useEffect, useState } from 'react'
import { EmployeeList } from './EmployeeList'
import { CreateEmployeeWidget } from './EmployeeWidget'


export default function App({apiInst}){
  const [empData, setEmpData] = useState([])
  const [empError, setEmpError] = useState()
  const [button, setButton] = useState(false)

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

  function toggleButton(){
    setButton(!button)
  }

  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  const addEmpContent = (
    <>
      <h4>Add new employee:</h4>
      <CreateEmployeeWidget 
          apiInst={apiInst} 
          fetch_emp_list={fetch_emp_list} 
          dep_choices={dep_choices}/>
    </>
  )

  const heading = <h4>List of employees:</h4>;
  let content = (
    <>
      {heading}
      <EmployeeList emp_list={empData}/>

      <button onClick={toggleButton} hidden={button}>Add new</button>
      {button ? addEmpContent : null}
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