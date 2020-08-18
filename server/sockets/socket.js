const { io } = require('./../server')
const {  Users } = require('./../classes/users')
const { createMessage } = require('./../utils/utils')

let users = new Users()

io.on('connection', (client) => {
  client.on('entryChat', (user, callback) => {
    if (!user.name) {
      return callback({
        err: true,
        message: 'Name is required'
      })
    }
    const persons = users.addPerson(client.id, user.name)

    client.broadcast.emit('personList', users.getAllPersons())

    callback(persons)
  })

  client.on('createMessage', (data) => {
    const person = users.getPerson(client.id)
    const message = createMessage(person.name, data.message)

    client.broadcast.emit('createMessage', message)
  })

  client.on('disconnect', () => {
    const userDeleted = users.deletePerson(client.id)
      //console.log('User disconnected', userDeleted)

    client.broadcast.emit('createMessage', createMessage('Admin', `${userDeleted.name} has left the chat`))
    client.broadcast.emit('personList', users.getAllPersons())
  })

  client.on('privateMessage', (data) => {
    const person = users.getPerson(client.id)
    client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message))
  })
})