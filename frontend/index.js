import React from 'react'
import ReactDOM from 'react-dom/client'

function App(){
  const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

  return (
    <>
      <h1>Hello World!</h1>
      <ul>
        {dep_choices.map(choice => 
          <li key={choice.id}>{choice.name}</li>)}
      </ul>
    </>
  );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(App())