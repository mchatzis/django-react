import React from "react"
import { Employee } from "./Employee"

export function EmployeeList({emp_list}){
    if (emp_list.length === 0){
        return <p>No employees registered with current logged in user.</p>
    }
    else{
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
}