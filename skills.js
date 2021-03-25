document.addEventListener('DOMContentLoaded', () => {
  function fetchData() {
    fetch('http://localhost:5000/api/path/Frontend')
    .then(resp => resp.json())
    .then(data => renderSkills(data)).catch((err) => {
      handleError(err);
    })
  }
  function renderSkills(data) {
    const hardContainer = document.querySelector("#hard-skills");
    const softContainer = document.querySelector("#soft-skills");
    data.forEach((item) => {
      if (item.Name === 'hardSkills') {
        let skillsArr = item.text.split(",");
        skillsArr.forEach((skill) => {
          const skillElm = document.createElement('li');
          skillElm.innerHTML = skill;
          hardContainer.append(skillElm);
        })
      } 
      if (item.Name === 'softSkills') {    
        let skillsArr = item.text.split(",");
        skillsArr.forEach((skill) => {
          const skillElm = document.createElement('li');
          skillElm.innerHTML = skill;
          softContainer.append(skillElm);
        })
      }
    })
  }
  function handleError(err) {
    alert(`Could not load data. Please try again later! Err: ${err.message}`)
  }
  
  fetchData();
});