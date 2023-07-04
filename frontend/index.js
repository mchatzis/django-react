import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmployeesApi } from '../api-client/apis/EmployeesApi'
import { Configuration } from '../api-client/runtime'
import Cookies from 'js-cookie'
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'

const apiInst = new EmployeesApi(
  new Configuration(
    {
      basePath:'http://127.0.0.1:8000',
      headers:{'X-CSRFToken':Cookies.get('csrftoken')},
    },
  )
)

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<App apiInst={apiInst}/>,
    }
  ],
  {basename: "/"},
)


const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<RouterProvider router={router}/>)