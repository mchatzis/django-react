import React, { useState } from "react"
import { DepartmentEnum } from '../api-client/models'


export function CreateEmployeeWidget({apiInst, fetch_emp_list, dep_choices}){
    const [name, setName] = useState()
    const [department, setDepartment] = useState(DepartmentEnum.Sales)
    const [salary, setSalary] = useState()

    async function createEmployee(emp){
        await apiInst.employeesCreate(emp)
        .catch(err => console.log(err));
  
        fetch_emp_list();
    }

    const block_display = {
        display: "block",
        padding: "5px",
        margin: "10px"
    }

    return (
        <section>
            <label>Name</label>
            <input 
                    style={block_display} 
                    type="text"
                    onChange={event => setName(event.target.value)}/>

            <label htmlFor="department">Department</label>
            <select 
                    id="department" 
                    value={department}
                    style={block_display}
                    onChange={event => setDepartment(event.target.value)}>
            {dep_choices.map(choice => 
                                <option 
                                    id={choice.name} 
                                    key={choice.name}
                                    value={choice.value}
                                >
                                    {choice.name}
                                </option>
                                )
            }
            </select>

            <label>Salary</label>
            <input  style={block_display} 
                    type="number"
                    onChange={event => setSalary(event.target.value)}/>

            <button onClick={() => 
                createEmployee({employee: {name:name, department:department, salary:parseInt(salary)}})}>
                    Click for new employee
            </button>
        </section>
    )
}