const data = {
    "questions": [
      {
        "answers": [
          {
            "answer": "Ответ1",
            "isRight": false
          },
          {
            "answer": "Ответ2",
            "isRight": true
          },
          {
            "answer": "Ответ3",
            "isRight": false
          },
          {
            "answer": "Ответ4",
            "isRight": false
          }
        ],
        "img": "https://marshmallow.readthedocs.io/en/stable/api_reference.html#module-marshmallow.fields",
        "question": "Вопрос1"
      },
      {
        "answers": [
          {
            "answer": "Ответ1",
            "isRight": false
          },
          {
            "answer": "Ответ2",
            "isRight": false
          },
          {
            "answer": "Ответ3",
            "isRight": false
          },
          {
            "answer": "Ответ4",
            "isRight": true
          }
        ],
        "img": "",
        "question": "Вопрос2"
      }
    ]
  }

function ready() {
  const vue = new Vue();
    // const axios = require('axios');
    // const host = "http://localhost:5000/"
    
    let boxesDiv = document.getElementById("boxes");
    let currentQuest = 0;
    for (let i=0; i < data.questions.length; i++) {
        let box = document.createElement('div');
        let num = document.createElement('span');
        num.innerHTML = i;
        num.setAttribute('style', '');
        box.appendChild(num);
        box.setAttribute('id', 'quest' + i);
        box.setAttribute('class', 'box idle-box');
        box.setAttribute('onclick', 'setCurrentQuestion(this)')
        boxesDiv.appendChild(box);   
    }
    setCurrentQuestion(document.getElementById('quest' + currentQuest))
}

function setCurrentQuestion(el) {
    currentQuest = el.id.substring(5);
    el.removeAttribute('class');
    el.setAttribute('class', 'box active-box');
    clearWindow();
    loadQuestion(currentQuest);
}

function clearWindow() {
    let questDiv = document.getElementById
    

}
function loadQuestion(num) {
    console.log(num)
    let questDiv = document.getElementById("question");
    let text = document.createElement("div");
    text.setAttribute('id', 'questText');
    let quest = document.createElement('p');
    let h = document.createElement('h2');
    h.setAttribute('id', 'questH');
    quest.setAttribute('id', 'question')
    h.innerHTML = "Вопрос №" + (num + 1);
    quest.innerHTML = data.questions[num].question;
    text.appendChild(h);
    text.appendChild(quest);
    questDiv.appendChild(text);
}
document.addEventListener('DOMContentLoaded', ready);