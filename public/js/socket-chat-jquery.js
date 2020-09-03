const params = new URLSearchParams(window.location.search)
const name = params.get('name')
const room = params.get('room')
let divUsuarios = $('#divUsuarios')
let formSend = $('#formSend')
let txtMessage = $('#txtMessage')
let divChatbox = $('#divChatbox')

function renderUsers(persons) {
  let html = ''
  html += `<li>`
  html += `  <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')} </span></a>`
  html += `</li>`

  for (let i = 0; i < persons.length; i++) {
    html += `<li>`
    html += `  <a data-id="${persons[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persons[i].name} <small class="text-success">online</small></span></a>`
    html += `</li>`
  }

  divUsuarios.html(html)

}

function renderMessage(message) {
  let html = ''

  html += `<li class="animated fadeIn">`
  html += `  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`
  html += `  <div class="chat-content">`
  html += `    <h5>${message.name}</h5>`
  html += `    <div class="box bg-light-info">${message.message}</div>`
  html += `  </div>`
  html += `  <div class="chat-time">${message.date}</div>`
  html += `</li>`

  divChatbox.append(html)
}

// Listeners
divUsuarios.on('click', 'a', function() {
  let id = $(this).data('id')
  if (id) {
    console.log(id)
  }
})

formSend.on('submit', function(e) {
  e.preventDefault()
  if (txtMessage.val().trim().length === 0) {
    return;
  }

  socket.emit('createMessage', {
    name: name,
    message: txtMessage.val()
  }, function(message) {
    txtMessage.val('').focus()
    renderMessage(message)
  })
})