const host = "http://localhost:5000"
const axios = require('axios');
function ready() {
    const url = host + '/api/results'
    axios({
        method: 'get',
        url: url,
        auth: {
            username: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password')
        }
    })
    .then(function(response) { 
        drawResults(response.data)
    });
}

function drawResults(data) {
    let div = document.getElementById("list");
    let ul = document.createElement('ul');
    for (let i=0; i<data.results.length; i++) {
        test = data.results[i];
        for (let j=0; j<test.length; j++) {
            result = test[j];
            let li = document.createElement("li");
            li.innerHTML = "Студент(ка) " + result['user.name'] + " в тесте " + result['finished_test.title'] + " набрал(а) " + result['score'];
            ul.appendChild(li);
        }
        div.appendChild(ul);
    }
}

document.addEventListener("DOMContentLoaded", ready);