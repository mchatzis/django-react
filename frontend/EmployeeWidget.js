import React, { useState } from "react"
import { DepartmentEnum } from '../api-client/models'

const blockDisplay = {
    display: "block",
    padding: "5px",
    margin: "10px"
}

const errDisplay = {
    display: "block",
    paddingLeft: "10px",
    marginTop:"-10px",
    marginBottom:"10px",
    color:"red"
}

export function CreateEmployeeWidget({apiInst, fetch_emp_list, dep_choices}){
    const [name, setName] = useState('')
    const [department, setDepartment] = useState(DepartmentEnum.Sales)
    const [salary, setSalary] = useState('')

    const [errors, setErrors] = useState({})

    function clearFields(){
        setName('');
        setDepartment(DepartmentEnum.Sales);
        setSalary('');
    }

    function createEmployee(emp){
        apiInst.employeesCreate(emp)
        .then(() => {
                fetch_emp_list();
                clearFields();
            }
        )
        .catch(err => {
                var code = err.response.status
                console.log(code)
                if (code === 400) {
                    err.response.json()
                    .then(msg => setErrors(msg)) 
                }

            }
        )
    }

    return (
        <section>
            <label>Name</label>
            <input 
                    style={blockDisplay} 
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}/>
            {errors.name ? <span style={errDisplay}> {errors.name} </span> : null}

            <label htmlFor="department">Department</label>
            <select 
                    id="department" 
                    value={department}
                    style={blockDisplay}
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

            <label>Salary</label>
            <input  style={blockDisplay} 
                    type="number"
                    value={salary}
                    onChange={event => setSalary(event.target.value)}/>
            {errors.salary ? <span style={errDisplay}> {errors.salary} </span> : null}

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