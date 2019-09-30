function ready() {
  const axios = require('axios'); //Создаеём переменную axois, которая позволит использовать функционал модуля axios
  const host = "http://localhost:5000" //В переменную хоста пишем адрес, где располагается бекенд

  const regBtn = document.getElementById("regBtn"); //Получаем кнопку отправки формы регистрации
  const loginBtn = document.getElementById("loginBtn"); //Получаем кнопку отправки формы входа 
  let loading = document.getElementById("loading"); // Получаем элемент, отображающий загрузку

  //Добавляем обработчик события отправки формы регистрации
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
//Добавляем обработчик события отправки формы входа
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

  //Функция для отправки json на бекенд
  function register(form) {
    let object = {};
    let isTeacher = document.getElementById("isTeacher_reg")
    form.forEach(function(value, key) {
      object[key] = value;
  });

    if (isTeacher.checked) {
      object["isTeacher"] = 1;
      sessionStorage.setItem("isTeacher", 1);
    } else {
      object["isTeacher"] = 0;
      sessionStorage.setItem("isTeacher", 0);
    }

    const json = JSON.stringify(object);

    const email = form.get("email");
    const password = form.get("password");
    const url = host + '/api/users'; // Определяем точный url отравки

    axios ({
        url: url,
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: json
      })
    .then(function(response) {
      //При выполнении промиса и статусе ответа 200, записываем данные о пользователе в данные сессии
      if (response.status == 200) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        url_test = host + '/api/tests';
        //Отправляем запрос на получение тестов и в случае выполнения промиса перенаправляем на страницу с тестами
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
//Добавляем обработчик события отправки формы регистрации
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
      //При выполнении промиса и статусе ответа 200, записываем данные о пользователе в данные сессии и перенаправляем на страницу с тестами
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
document.addEventListener("DOMContentLoaded", ready);//Ожидаем пока дерево DOM загрузится до конца и после этого выполняем код
