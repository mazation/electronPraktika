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
