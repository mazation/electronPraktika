formGroupLogin = document.getElementById('login')
formGroupReg = document.querySelector('#reg')
loginBtn = document.querySelector('#loginBtn')
regBtn = document.querySelector('#regBtn')

const url = 'localhost:5000'

formGroupLogin.onsubmit = async(e) => {
  e.preventDefault();
  console.log(FormGroupLogin.email)
  // headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  // let response = await fetch(url + '/api/dashboard', {
  //   headers: headers
  // });
}
