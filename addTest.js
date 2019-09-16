function ready() {
    const axios = require('axios');
const host = "https://mazation96.pythonanywhere.com/"

const form = document.forms.addTestForml;
const btn = document.getElementById("sendTest");
console.log(sessionStorage.getItem("email"))

btn.addEventListener('click', function(e) {
    e.preventDefault();
    object = {};
    form.forEach(function(value, key) {
        object[key] = value;    
    });
    const json = JSON.stringify(object);
    

    const url = host + '/api/addTest';
    axios({
        url: url,
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: json,
    }).then(function(response){
        if (response == '200') {
            alert('Тест был успешно загружен!');
            document.location.href = "tests.html"

        } else {
            alert("Что-то пошло не так!");
            document.location.href = "addTest.html"
        }
    })
})

}
document.addEventListener("DOMContentLoaded", ready);



