import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { EmployeeList } from './EmployeeList'
import { EmployeesApi } from '../api-client/apis/EmployeesApi'
import { Configuration } from '../api-client/runtime'


function App(){
  const [empData, setEmpData] = useState([])
  
  useEffect(()=> {
      const apiInst = new EmployeesApi(new Configuration({basePath:'http://127.0.0.1:8000'}))
      apiInst.employeesList()
      .then(data => setEmpData(data))
      .catch(err => console.error(err));
    }
    ,[])

  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  return (
    <>
      <h4>Possible Department choices:</h4>
      <ul>
        {dep_choices.map(choice => 
          <li key={choice.id}>{choice.name}</li>)}
      </ul>
      <h4>List of employees:</h4>
      <EmployeeList emp_list={empData}/>
    </>
  );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App />)