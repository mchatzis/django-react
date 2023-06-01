import React from "react"

export function Employee({id, user, name, department, salary}){
    return (
    <>
    <p>{name}</p>
    <ul>
        <li>id:{id}</li>
        <li>user:{user}</li>
        <li>department:{department}</li>
        <li>salary:{salary}</li>
    </ul>
    </>
    );
}

