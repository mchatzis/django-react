fetch('/api/employees/')
.then(res => res.json())
.then(json => console.log(json))
// .then(res => console.log(res))
            