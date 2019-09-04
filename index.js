const mainDiv = document.querySelector('#forms');

function createForm(id, options) {
  let formGroup = document.createElement('div');
  formGroup.setAttribute('id', id);
  formGroup.setAttribute('class', "col-6");
  inputs = options.inputs
  for (let key in inputs) {
    let label = document.createElement('label')
    let input = document.createElement('input')
    label.innerHTML = inputs[key].label
    input.setAttribute('type', inputs[key].type)
    input.setAttribute('id', key)
    label.setAttribute('for', key)
    const inputGrooup = document.createElement('div')
    inputGrooup.setAttribute('class', 'input-group mb-3')
    inputGrooup.appendChild(label)
    inputGrooup.appendChild(input)
    formGroup.appendChild(inputGrooup)
  }
  btn = document.createElement('input')
  btn.setAttribute('type', 'submit')
  btn.setAttribute('value', 'submit')
  btn.setAttribute('id', id + 'Btn')
  formGroup.appendChild(btn)
  let btnValue = id == 'reg' ? "Зарегистрироваться" : "Войти"
  btn.setAttribute('value', btnValue)
  mainDiv.appendChild(formGroup);
}


const regiiserObj = {
  "id" : 'reg',
  "inputs" : {
    "name" : {
      "label" : "ФИО",
      "type" : "text"
    },
    "email" : {
      "label" : "Эмейл",
      "type" : "email"
    },
    "password" : {
      "label": "Пароль",
      "type": "password"
    },
    "isTeacher" : {
      "label" : "Я учитель",
      "type" : "checkbox"
    }
  },
  "btnClass" : "btn btn-info"
};

const loginObj = {
  "id" : "login",
  "inputs" : {
    "email" : {
      "label" : "Эмейл",
      "type" : "email"
    },
    "password" : {
      "label": "Пароль",
      "type": "password"
    }
  }
};
createForm('reg', regiiserObj)
createForm('login', loginObj)

formGroupLogin = document.getElementById('login')
formGroupReg = document.querySelector('#reg')
loginBtn = document.querySelector('#loginBtn')
regBtn = document.querySelector('#regBtn')

loginBtn.addEventListener('click', function(){
  e.preventDefault()
  sendLoginForm(formGroipLogin)
})
// regBtn.addEventListener('click', sendRegForm)
console.log(formGroupLogin)
function sendLoginForm(form) {
  console.log(form)
  for (let i in form.getElementsByTagName("INPUT")) {
    console.log(form.getElementsByTagName("INPUT"))
  }
}
