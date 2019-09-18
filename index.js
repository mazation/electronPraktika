function ready() {
  const mainDiv = document.querySelector('#forms');

function createForm(id, options) {
  let formGroup = document.createElement('div');
  formGroup.setAttribute('id', id);
  formGroup.setAttribute('class', "col-6");
  let form = document.createElement('form')
  form.setAttribute("name", id)
  title = document.createElement('h1')
  title.innerHTML = options.title
  title.setAttribute('class', "text-center")
  formGroup.appendChild(title)
  inputs = options.inputs
  for (let key in inputs) {
    
    let label = document.createElement('label')
    let input = document.createElement('input')
    label.innerHTML = inputs[key].label
    input.setAttribute('type', inputs[key].type)
    input.setAttribute('id', key +"_"+ id)
    if (inputs[key].type == 'checkbox') {
      input.setAttribute('class', 'form-check-input');
      label.setAttribute('class', 'form-check-label')
      
    } else {
      input.setAttribute('class', 'form-control');
      label.setAttribute('class', 'col-form-label')
    }
    input.setAttribute('name', key)
    label.setAttribute('for', key)
    label.setAttribute('class', 'col-form-label')
    const inputGroup = document.createElement('div')
    inputGroup.setAttribute('class', 'input-group mb-3')
    inputGroup.appendChild(label)
    inputGroup.appendChild(input)
    form.appendChild(inputGroup)
  }
  btn = document.createElement('input')
  btn.setAttribute('type', 'submit')
  btn.setAttribute('value', 'submit')
  btn.setAttribute('id', id + 'Btn')
  form.appendChild(btn)
  let btnValue = id == 'reg' ? "Зарегистрироваться" : "Войти"
  btn.setAttribute('value', btnValue)
  formGroup.appendChild(form)
  mainDiv.appendChild(formGroup);
}



const regiiserObj = {
  "id" : 'reg',
  "title" : "Регистрация",
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
  "title" : "Вход",
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
}

document.addEventListener("DOMContentLoaded", ready);
