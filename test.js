let answered = [];
let right = 0;
const axios = require('axios');
const host = "http://localhost:5000";
url = host + '/api/tests/' + sessionStorage.getItem('testId');
var data;
axios({
  metgod: "get",
  url: url,
  auth: {
    username: sessionStorage.getItem("email"),
    password: sessionStorage.getItem("password")
  }
})
.then(function(response) {
  data=response.data
  drawTest(data);
})
.catch(function(error) {
  console.log(error)
  alert("Что-то пошло не так");
  return null;
}); 
function ready() { 

}

function drawTest(data) {
  data = data;
  let boxesDiv = document.getElementById("boxes");
  let currentQuest = 0;
  for (let i=0; i < data.questions.length; i++) {
      let box = document.createElement('div');
      let num = document.createElement('span');
      num.innerHTML = i + 1;
      num.setAttribute('style', '');
      box.appendChild(num);
      box.setAttribute('id', 'quest' + i);
      box.setAttribute('class', 'box idle-box');
      box.setAttribute('onclick', 'setCurrentQuestion(this)')
      boxesDiv.appendChild(box);   
    }
    if (data.maxTime) {
      timer(data.maxTime);
    } else {
      document.getElementById('timer').setAttribute('style', 'display: none;')
    }
    setCurrentQuestion(document.getElementById('quest' + currentQuest))
    answersForm = document.forms[0];
}

function setCurrentQuestion(el) {
    changeColorOfPrev();
    currentQuest = el.id.substring(5);
    el.removeAttribute('class');
    el.setAttribute('class', 'box active-box');
    clearWindow();
    loadQuestion(currentQuest);
}

function setRight() {
  clearWindow();
  div = document.getElementById('question');
  span = document.createElement('span');
  span.setAttribute('id', 'rightAnswer');
  span.innerHTML = 'Вы уже ответили правильно!';
  div.appendChild(span);
}

function setWrong() {
  clearWindow();
  div = document.getElementById('question');
  span = document.createElement('span');
  span.setAttribute('id', 'wrongAnswer');
  span.innerHTML = 'Вы уже ответили неправильно!'
  div.appendChild(span);
}

function changeColorOfPrev() {
  prev = document.getElementsByClassName("active-box")[0] ? document.getElementsByClassName("active-box")[0] : null;
  if (prev) {
    prev.removeAttribute('class');
    prev.setAttribute('class', 'box idle-box');
  }
}


function clearWindow() {
    rightSpan = document.getElementById('rightAnswer');
    wrongSpan = document.getElementById('wrongAnswer');
    rightSpan ? rightSpan.remove() : null;
    wrongSpan ? wrongSpan.remove() : null;
    rightMessageSpan = document.getElementById('rightAnswerMessage');
    wrongMessageSpan = document.getElementById('wrongAnswerMessage');
    rightMessageSpan ? rightMessageSpan.remove() : null;
    wrongMessageSpan ? wrongMessageSpan.remove() : null;
    divToRemove1 = document.getElementById("questText");
    divToRemove2 = document.getElementById("imgDiv");
    divToRemove3 = document.forms[0];
    divToRemove1 ? divToRemove1.remove() : null;
    divToRemove2 ? divToRemove2.remove() : null;  
    divToRemove3 ? divToRemove3.remove() : null;  
}

function loadQuestion(num) {
    const qData = data.questions[num];
    //Создаем элемент с текстом вопроса
    let questDiv = document.getElementById("question");
    let text = document.createElement("div");
    text.setAttribute('id', 'questText');
    let quest = document.createElement('p');
    let h = document.createElement('h2');
    h.setAttribute('id', 'questH');
    quest.setAttribute('id', 'question')
    h.innerHTML = "Вопрос №" + (parseInt(num) + 1);
    quest.innerHTML = qData.question;
    text.appendChild(h);
    text.appendChild(quest);

    //Создаем элемент с картинкой, если она есть
    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('id', 'imgDiv');
    if (qData.img) {
      let img = document.createElement('img');
      img.setAttribute('src', qData.img);
      img.setAttribute('width', '500');
      img.setAttribute('height', '300');
      imgDiv.appendChild(img);
    }

    //Добавляем ответы
    let ans = [];
    let form = document.createElement('form');
    form.setAttribute('id', 'answersForm');
    form.setAttribute('name', 'answers');
    for(let i=0; i<qData.answers.length; i++) {
      answer = qData.answers[i];
      let input = document.createElement('input');
      let label = document.createElement('label');
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'answer');
      input.setAttribute('value', i);
      input.setAttribute('id', 'choice' + i)
      label.setAttribute('for', 'choice' + i);
      label.innerHTML = answer.answer;
      form.appendChild(input);
      form.appendChild(label);
    }
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Ответить');
    form.appendChild(submit);

    
    questDiv.appendChild(text);
    questDiv.appendChild(imgDiv);
    questDiv.appendChild(form);
    submit.addEventListener('click', checkAsnwers)
}

function checkAsnwers(e) {
  e.preventDefault();
  answered.push(currentQuest);
  const formCheck = document.forms[0];
  answers = data.questions[currentQuest].answers
  chosenAnswer = document.querySelector('input[name="answer"]:checked').value;
  if (answers[chosenAnswer].isRight) {
    isRight(currentQuest);
  } else {
    isWrong(currentQuest);
  }
  console.log(document.querySelector('input[name="answer"]:checked').value);
  console.log(currentQuest);
  event.target.remove()
}

function isRight(q) {
  box = document.getElementById('quest' + q);
  box.removeAttribute('class');
  box.setAttribute('class', 'box right-answer');
  box.removeAttribute('oncklick');
  box.setAttribute('onclick', 'setRight()');
  right++;
  quest = document.getElementById('question');
  message = document.createElement('span');
  message.setAttribute('id', 'rightAnswerMessage');
  message.innerHTML = 'Вы ответили правильно!';
  quest.appendChild(message);
}

function isWrong(q) {
  box = document.getElementById('quest' + q);
  box.removeAttribute('class');
  box.setAttribute('class', 'box wrong-answer');
  box.removeAttribute('oncklick');
  box.setAttribute('onclick', 'setWrong()');
  quest = document.getElementById('question');
  message = document.createElement('span');
  message.setAttribute('id', 'wrongAnswerMessage');
  message.innerHTML = 'Вы ответили неправильно!';
  quest.appendChild(message);
}

function sendTest() {
    testId = sessionStorage.getItem('testId');
    sendUrl = host + '/api/results' 
    axios({
      method: "post",
      url: sendUrl,
      auth: {
        username: sessionStorage.getItem('email'),
        password: sessionStorage.getItem('password')
      },
      data: {
        "testId": testId,
        "score": right
      }
    })
    .then(function(response) {
      message = "Вы набрали " + right;
      alert(message);
      document.location.href = "tests.html";
     })
     .catch(function(error) {
       alert("Что-то пошло не так");
     });
  }

  function timer(time) {
    if (time != 0) {
      let span = document.getElementById("time");
    span.innerHTML = time;
    span.innerHTML--
    setTimeout(timer, 60*1000, parseInt(p.innerHTML));
    } else {
      alert("Время вышло!");
      sendTest();
    }
    
  }


document.addEventListener('DOMContentLoaded', ready);