let socket = io()
  // let params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html'
  throw new Error('Name is required and room is required')
}

const user = {
  name: params.get('name'),
  room: params.get('room')
}

// Escuchar información
socket.on('connect', function() {
  console.log('Conectado al servidor')

  socket.emit('entryChat', user, function(response) {
    console.log('Users connected', response)
    renderUsers(response)
  })
})

socket.on('disconnect', function() {
  console.log('Perdimos conexion con el servidor')
  renderUsers(response)
})

socket.on('createMessage', function(message) {
  // console.log('Server', message)
  renderMessage(message, false)
  scrollBottom()
})

socket.on('personList', function(response) {
  console.log('Users connected', response)
  renderUsers(response)
})

socket.on('privateMessage', function(message) {
  console.log('Privite message', message)
})