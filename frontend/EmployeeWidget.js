import React, { useState } from "react"
import { DepartmentEnum } from '../api-client/models'

const block_display = {
    display: "block",
    padding: "5px",
    margin: "10px"
}

const err_display = {
    display: "block",
    paddingLeft: "10px",
    marginTop:"-10px",
    marginBottom:"10px",
    color:"red"
}

export function CreateEmployeeWidget({apiInst, fetch_emp_list, dep_choices}){
    const [name, setName] = useState()
    const [department, setDepartment] = useState(DepartmentEnum.Sales)
    const [salary, setSalary] = useState()

    const [errors, setErrors] = useState({})

    async function createEmployee(emp){
        await apiInst.employeesCreate(emp)
        .catch(err => {
                var code = err.response.status
                console.log(code)
                if (code === 400) {
                    err.response.json()
                    .then(data => setErrors(data)) 
                }

            }
        );
        fetch_emp_list();
    }

    return (
        <section>
            <label>Name</label>
            <input 
                    style={block_display} 
                    type="text"
                    onChange={event => setName(event.target.value)}/>
            {errors.name ? <span style={err_display}> {errors.name} </span> : null}

            <label htmlFor="department">Department</label>
            <select 
                    id="department" 
                    value={department}
                    style={block_display}
                    onChange={event => setDepartment(event.target.value)}>
            {
            Object.entries(dep_choices).map(([db_name, name]) => 
                                <option 
                                    id={db_name} 
                                    key={db_name}
                                    value={db_name}
                                >
                                    {name}
                                </option>
                                )
            }
            </select>
            {errors.department}

            <label>Salary</label>
            <input  style={block_display} 
                    type="number"
                    onChange={event => setSalary(event.target.value)}/>
            {errors.salary ? <span style={err_display}> {errors.salary} </span> : null}

            <button 
                onClick={() => 
                createEmployee({employee: {name:name, department:department, salary:parseInt(salary)}})}
                style={{marginTop:"10px"}}
            >
                    Click for new employee
            </button>
        </section>
    )
}