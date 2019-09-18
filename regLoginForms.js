function ready(){
  const axios = require('axios');
  const host = "https://mazation96.pythonanywhere.com/"

  const regBtn = document.getElementById("regBtn");
  const loginBtn = document.getElementById("loginBtn");

  regBtn.addEventListener("click", function(e) { 
    e.preventDefault();
    const form = new FormData(document.forms.reg)
    if (!(form.get("name") && form.get("email") && form.get("password"))) {
      alert("Необходимо заполнить все поля!");
      document.location.href='index.html'
    } else {
      register(form);
    }
    
  })

  loginBtn.addEventListener("click", function(e){
    e.preventDefault()
    const form = new FormData(document.forms.login)
    if (!(form.get("email") && form.get("password"))){
      alert("Необходимо заполнить все поля!");
      document.location.href = 'index.html'
    } else {
      login(form)
    }
  })

  let testsDiv = document.getElementById('tests');
  // function drawTests(data) {
  //   let test = document.createElement('div');
  //   const testsArr = data.tests;
  //   testsArr.forEach(function(test) {
  //     let title = document.createElement('a');
  //     title.setAttribute("id", "testId-" + test.id)
  //     title.setAttribute("href", "test.html")
  //     title.innerHTML(data.title);
      
  //     titleDiv = document.createElement("div");
  //     titleDiv.apendChild(title);
  //     testsDiv.appendChild(titleDiv);
  //   })

  // }

  function register(form) {
    let object = {};
    let isTeacher = document.getElementById("isTeacher_reg")
    form.forEach(function(value, key) {
      object[key] = value;
  });

    if (isTeacher.checked) {
      object["isTeacher"] = 1;
    } else {
      object["isTeacher"] = 0;
    }

    const json = JSON.stringify(object);

    const email = form.get("email");
    const password = form.get("password");
    const url = host + 'api/users';

    axios ({
        url: url,
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: json
      })
    .then(function(response) {
      if (response.status == 200) {
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('password', password)
        url_test = host + 'api/tests'
        axios({
          url: url_test,
          method: "get",
          auth: {
            username: email,
            password: password
          }
        })
        .then(function(response) {
            alert("Вы были успешно зарегистрированы!")
            document.location.href = "tests.html"
        })
      } else {
        alert("Что-то пошло не так!")
      }
    })
  }

  function login(form) {
    const email = form.get("email")
    const password = form.get("password")
    const url = host + 'api/tests'

    axios ({
      url: url,
      method: "get",
      auth: {
        username: email,
        password: password
      }
    })
    .then(function(response) {
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('password', password)
      document.location.href = "tests.html"
      // drawTests(response.data);
    })
    .catch(function(error){
      alert("Неверный логин и пароль")
    }) 
  }
}
document.addEventListener("DOMContentLoaded", ready);
