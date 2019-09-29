function ready() {
  const axios = require('axios');
  const host = "http://localhost:5000"

  const regBtn = document.getElementById("regBtn");
  const loginBtn = document.getElementById("loginBtn");
  let loading = document.getElementById("loading");

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

  function register(form) {
    let object = {};
    let isTeacher = document.getElementById("isTeacher_reg")
    form.forEach(function(value, key) {
      object[key] = value;
  });

    if (isTeacher.checked) {
      object["isTeacher"] = 1;
      sessionStorage.setItem("isTeacher", true);
    } else {
      object["isTeacher"] = 0;
    }

    const json = JSON.stringify(object);

    const email = form.get("email");
    const password = form.get("password");
    const url = host + '/api/users';

    axios ({
        url: url,
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: json
      })
    .then(function(response) {
      if (response.status == 200) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        url_test = host + '/api/tests';
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
    const email = form.get("email");
    const password = form.get("password");
    const url = host + '/api/tests';
    loading.removeAttribute('style');

    axios ({
      url: url,
      method: "get",
      auth: {
        username: email,
        password: password
      }
    })
    .then(function(response) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("isTeacher", response.data.isTeacher);
      document.location.href = "tests.html";
    })
    .catch(function(error){
      alert("Неверный логин и пароль")
    }) 
  }
}
document.addEventListener("DOMContentLoaded", ready);
