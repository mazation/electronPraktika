const axios = require('axios');
const host = "https://mazation96.pythonanywhere.com/"

const regBtn = document.getElementById("regBtn");
const loginBtn = document.getElementById("loginBtn");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

let user = new User()

regBtn.addEventListener("click", function(e) { 
  e.preventDefault();
  const form = new FormData(document.forms.reg)
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
  var json = JSON.stringify(object);
  const email = form.get("email");
  const password = form.get("password");
  const url = host + 'api/users'
  axios ({
      url: url,
      method: 'post',
      headers: {"Content-Type": "application/json"},
      data: json,
    })
  .then(function(response) {
    if (response.status == 200) {
      user.email = email
      user.password = password
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
          alert("You were registered successfully!")
          console.log(response)
          document.location.href = "tests.html"
      })
    } else {
      alert("Something gone wrong!")
    }
  })
})

loginBtn.addEventListener("click", function(e){
  e.preventDefault()
  const form = new FormData(document.forms.login)
  const email = form.get("email")
  const password = form.get("password")
  const url = host + 'api/tests'

  let response = axios ({
    url: url,
    method: "get",
    auth: {
      username: email,
      password: password
    }
  })
  .then(function(response) {
    user.email = email
    user.password = password
    document.location.href = "test.html"
    drawTests(response.data);
  })
  .catch(function(error){
    alert("Неверный логин и пароль")
  }) 
})

function logout() {
  delete user;
}

let testsDiv = document.getElementById('tests');
function drawTests(data) {
  let test = document.createElement('div');
  const testsArr = data.tests;
  testsArr.forEach(function(test) {
    let title = document.createElement('a');
    title.setAttribute("id", "testId-" + test.id)
    title.setAttribute("href", "test.html")
    title.innerHTML(data.title);
    
    titleDiv = document.createElement("div");
    titleDiv.apendChild(title);
    testsDiv.appendChild(titleDiv);
  })

}
