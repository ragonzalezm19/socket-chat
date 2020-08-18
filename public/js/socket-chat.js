let socket = io()
let params = new URLSearchParams(window.location.search)

if (!params.has('name')) {
  window.location = 'index.html'
  throw new Error('Name is required')
}

const user = {
  name: params.get('name')
}

// Escuchar información
socket.on('connect', function() {
  console.log('Conectado al servidor')

  socket.emit('entryChat', user, function(response) {
    console.log('Users connected', response)
  })
})

socket.on('disconnect', function() {
  console.log('Perdimos conexion con el servidor')
})

socket.on('createMessage', function(message) {
  console.log('Server', message)
})

socket.on('personList', function(response) {
  console.log('Users connected', response)
})

// Enviar información
socket.emit('enviarMensaje', {
  usuario: 'Fernando',
  mensaje: 'Hola Mundo'
}, function(resp) {
  console.log('Respuesta del server:', resp)
})