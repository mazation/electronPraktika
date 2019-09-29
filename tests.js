function ready() {
    const host = "http://localhost:5000"
    const axios = require('axios');

    const url = host + '/api/tests'
    loading = document.getElementById("loading");
    axios({
        url: url,
        method: 'get',
        auth: {
            username: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password')
        }
    })
    .then(function(response) {
        if (response.status != 200) {
            alert("Что-то пошло не так!");
        } else {
            let div = document.getElementById('tests');
            let ul = document.createElement('ul');
            let tests = response.data.tests;
            tests.forEach(test => {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('href', 'test.html');
                a.setAttribute('id', test.id);
                a.setAttribute('onclick', 'loadTest(this)');
                a.innerHTML = test.title;
                li.appendChild(a);
                ul.appendChild(li);
            });
            div.appendChild(ul);
            loading.setAttribute('style', 'display: none;');
        }
    })
    let teacherDiv = document.getElementById("forTeacher"); 
    console.log(sessionStorage.getItem("isTeacher"))
    if (sessionStorage.getItem("isTeacher") != 1) {
        teacherDiv.setAttribute("style", "display:none;")
    }
}

function loadTest(elem) {
    sessionStorage.setItem('testId', elem.id);
}

document.addEventListener("DOMContentLoaded", ready);