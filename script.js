fetch ('http://localhost:5000/api/sample')
.then(response => response.json())
.then (data => console.log(data)); 