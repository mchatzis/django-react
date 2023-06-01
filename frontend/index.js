import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { EmployeeList } from './EmployeeList'


function App(){
  const [empData, setEmpData] = useState([])

  useEffect(()=> {
      fetch(URLS.LIST_EMPLOYEES)
      .then(res => res.json())
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