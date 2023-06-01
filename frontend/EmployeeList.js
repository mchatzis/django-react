import React from "react"
import { Employee } from "./Employee"

export function EmployeeList({emp_list}){
    console.log(Array.isArray(emp_list))
    return (
        <>
            <ul>
            {emp_list.map(item => 
                <li key={item.name}><Employee {...item}/></li>
            )}
            </ul>
        </>
    )
}