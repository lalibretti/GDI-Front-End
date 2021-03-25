document.addEventListener('DOMContentLoaded', () => {
  function fetchData() {
    const field = localStorage.getItem('bestField');
    console.log(field);
    fetch(`https://gdi-backend.herokuapp.com/${field}`)
    .then(resp => resp.json())
    .then(data => renderDescription(data)).catch((err) => {
      handleError(err);
    })
  }
  function renderDescription(data) {
    console.log(data);
    const descripContainer = document.querySelector("#jobdescrip");
    data.forEach((item) => {
      console.log(typeof item);
      if (item.Name ==='jobDescripMain') {
        console.log(item.text);
        const p = document.createElement('p');
        p.innerHTML = item.text;
        descripContainer.append(p);
      }
    })
  }
  function handleError(err) {
    alert(`Could not load data. Please try again later! Err: ${err.message}`)
  }
  
  fetchData();
});