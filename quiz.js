class Quiz {
  constructor() {
    this.questions = [];
    this.score = {
      Frontend: 0,
      Backend: 0,
      uiux: 0,
      datascience: 0
    }
    this.currentQuestion = Number(localStorage.getItem('currentQuestion')) || 1;
  }
  renderQuiz(current) {
    const forwardButton = document.querySelector("#button");
    forwardButton.disabled = true;
    const question = this.questions[current - 1];
    console.log(this.questions);
    const quizContainer = document.querySelector("#quiz-container");
    const quizForm = document.createElement('form');
    quizForm.onsubmit = (e) => this.submitAnswer(e);
    quizContainer.append(quizForm);
    const questionElm = document.createElement('h2');
    questionElm.innerHTML = question.content;
    const answerContainer = document.createElement('ul');
    quizForm.append(questionElm);
    quizForm.append(answerContainer);
    const {answers} = question;
    answers.forEach((answer) => {
      const answerInput = document.createElement('input');
      const answerLabel = document.createElement('label');
      answerInput.type = 'radio';
      answerInput.name = 'answer';
      answerInput.value = answer.content;
      answerLabel.for = answer.content;
      answerLabel.innerHTML = answer.content;
      answerContainer.append(answerLabel,answerInput);
    });
    const button = document.createElement('button');
    button.innerHTML = "Submit";
    button.type = 'submit';
    quizForm.append(answerContainer);
    quizForm.append(button);
}
  renderResults() {
    // render 'thank you for completing the quiz then go to results'
    const button = document.querySelector("#button");
    button.disabled = false;
    button.onclick = () => location.href = '  https://gdi-backend.herokuapp.com/results.html';
    const thanks = document.createElement('h2');
    const proceed = document.createElement('p');
    proceed.innerHTML = 'Please proceed to view the results of your quiz.'
    thanks.innerHTML = 'Thank you for your responses!';
    const quizContainer = document.querySelector("#quiz-container");
    quizContainer.append(thanks);
    quizContainer.append(proceed);
  }
  play() {
    document.addEventListener('DOMContentLoaded', () => {
      let quiz = this;
      function fetchData() {
        fetch('https://gdi-backend.herokuapp.com/api/questions')
        .then(resp => resp.json())
        .then(data => {
          quiz.questions = data;
          if (!quiz.isComplete()) {
            quiz.renderQuiz(quiz.currentQuestion);
          } else {
            quiz.renderResults();
          }
        }).catch((err) => {
          handleError(err);
        });
      }
      function handleError(err) {
        alert(`Could not load data. Please try again later! Err: ${err.message}`)
      }
      fetchData();
      
    });
    
  }
  determineField(score) {
    let values = Object.values(score);
    let maximum = Math.max(...values);
    let field = Object.keys(score).find((key) => score[key] === maximum);
    console.log(values,field);
    return field;
  }
  saveQuiz() {
    localStorage.setItem('currentQuestion',this.currentQuestion);
  }
  isComplete() {
    if (localStorage.getItem('currentQuestion')) {
      return Number(localStorage.getItem('currentQuestion')) > 2;
    } else return this.currentQuestion > 2; 
  }
  getCurrentQuestion() {
    if (localStorage.getItem('currentQuestion')) {
      return this.questions[Number(localStorage.getItem('currentQuestion')) - 1];
    } else return this.questions[this.currentQuestion - 1];
  }
  submitAnswer(e) {
    e.preventDefault();
    const elem = document.getElementsByTagName('input');
    for (let idx = 0; idx < elem.length; idx ++) {
      if (elem[idx].type === 'radio' && elem[idx].checked) {
        const {category,answers} = this.getCurrentQuestion();
        let selected = answers.find((answer) => answer.content === elem[idx].value);
        this.score[category] += selected.points;
        localStorage.setItem('bestField',this.determineField(this.score));
        console.log('field:',localStorage.getItem('bestField'));
        this.currentQuestion += 1;
      }
    }
    this.saveQuiz();
    if (!this.isComplete()) {
      this.renderQuiz(this.currentQuestion);
      location.reload();
    } else {
      this.renderResults();
    }
  }

}
  
let quiz = new Quiz();
quiz.play();

