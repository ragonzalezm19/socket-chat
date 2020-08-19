let params = new URLSearchParams(window.location.search)
let divUsuarios = $('#divUsuarios')

function renderUsers(persons) {
  console.log(persons)
  let html = ''
  html += '<li>'
  html += '  <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>'
  html += '</li>'

  for (let i = 0; i < persons.length; i++) {
    html += '<li>'
    html += '  <a data-id="' + persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>'
    html += '</li>'
  }

  divUsuarios.html(html)

}