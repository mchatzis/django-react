import React from "react"

const dep_choices = JSON.parse(document.getElementById('json-dep-choices').textContent);

export function Employee({id, user, name, department, salary}){
    return (
    <>
    <p>{name}</p>
    <ul>
        <li>id:{id}</li>
        <li>user:{user}</li>
        <li>department:{dep_choices[department]}</li>
        <li>salary:{salary}</li>
    </ul>
    </>
    );
}

