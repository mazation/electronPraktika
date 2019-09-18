function ready() {
    const host = "https://mazation96.pythonanywhere.com/"
    const axios = require('axios');

    const url = host + 'api/tests'
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
            alert("Что-то пошло не так!")
        } else {
            let rdiv = document.getElementById('tests');
            let ul = document.createElement('ul');
            let tests = response.data.tests;
            tests.forEach(test => {
                let li = document.createElement('li');
                li.innerHTML = test.title;
                ul.appendChild(li);
            });
            div.appendChild(ul)
        }
    })
}

document.addEventListener("DOMContentLoaded", ready);