import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

const URLS = {
  LIST_EMPLOYEES: "{% url 'sapi:employees-list' %}",
};
console.log(URLS.LIST_EMPLOYEES)

function App(){
  const [empData, setEmpData] = useState("")

  useEffect(()=> {
      fetch('http://127.0.0.1:8000/api/employees/')
      .then(res => res.json())
      .then(json_data => JSON.stringify(json_data, null, 2))
      .then(data => setEmpData(data))
      .catch(err => console.error(err));
    }
    ,[])

  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  return (
    <>
      <h1>Hello World!</h1>
      <ul>
        {dep_choices.map(choice => 
          <li key={choice.id}>{choice.name}</li>)}
      </ul>
      <pre>
        {empData}
      </pre>
    </>
  );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App />)