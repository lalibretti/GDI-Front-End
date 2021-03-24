var button = document.querySelector("#button");
var buttonClass = document.querySelector(".button");
button.addEventListener("click", function getData(e) {
  fetch ('http://localhost:5000/api/sample')
  .then(response => response.json())
  .then(data => console.log(data)); 
});