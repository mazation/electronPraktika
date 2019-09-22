function ready() {
    const axios = require('axios');
const host = "http://localhost:5000/"

let object = {}; 
const btn = document.getElementById("sendTest");
file = document.querySelector('#file');
file.addEventListener('change', function(e) {
    getBase64(file.files[0]);
})

btn.addEventListener('click', function(e) {
    e.preventDefault();
    const form = new FormData(document.forms.addTestForm);
    object.title = form.get('title'); 
    object.maxTime = form.get('maxTime'); 
    file = document.querySelector('#file');
    file.addEventListener('change', function(e) {
        object.file = getBase64(file.files[0]);
    })
    const json = JSON.stringify(object);
    console.log(json)
    

    const url = host + 'api/tests/create';
     axios({
         url: url,
         method: 'post',
         headers: {"Content-Type": "application/json"},
         data: json,
         auth: {
             username: sessionStorage.getItem('email'),
             password: sessionStorage.getItem('password')
         }
     }).then(function(response) {
         if (response.status == '200') {
             alert('Тест был успешно загружен!');
             document.location.href = "tests.html"

         } else {
             alert("Что-то пошло не так!");
             document.location.href = "addTest.html"
         }
     })
})

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
        object.file = window.btoa(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 
}
document.addEventListener("DOMContentLoaded", ready);