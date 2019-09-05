formGroupLogin = document.getElementById('login')
formGroupReg = document.querySelector('#reg')
loginBtn = document.querySelector('#loginBtn')
regBtn = document.querySelector('#regBtn')

const url = 'localhost:5000'

formGroupReg.onsubmit = async(e) => {
  e.preventDefault();
  var object = {};
  var formData = new FormData(document.forms.reg);

  formData.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'localhost:5000/users', true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  // Отсылаем объект в формате JSON и с Content-Type application/json
  xhr.send(json);
}

formGroupLogin.onsubmit = async(e) => {
  e.preventDefault()
  const formData = new FormData(document.forms.reg)
  const authString = formData.email + ":" + formData.password
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "localhost:5000/dashboard", true)
  xhr.setRequestHeader("Authorization", "Basic" + authString)
}


