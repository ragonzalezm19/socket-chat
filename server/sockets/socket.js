const { io } = require('./../server')
const { Users } = require('./../classes/users')
const { createMessage } = require('./../utils/utils')

let users = new Users()

io.on('connection', (client) => {
  client.on('entryChat', (user, callback) => {
    if (!user.name || !user.room) {
      return callback({
        err: true,
        message: 'Name/Room is required'
      })
    }

    client.join(user.room)

    users.addPerson(client.id, user.name, user.room)
    const persons = users.getPersonByRoom(user.room)
    client.broadcast.to(user.room).emit('personList', persons)

    callback(persons)
  })

  client.on('createMessage', (data) => {
    const person = users.getPerson(client.id)
    const message = createMessage(person.name, data.message)

    client.broadcast.to(person.room).emit('createMessage', message)
  })

  client.on('disconnect', () => {
    const userDeleted = users.deletePerson(client.id)

    client.broadcast.to(userDeleted.room).emit('createMessage', createMessage('Admin', `${userDeleted.name} has left the chat`))
    client.broadcast.to(userDeleted.room).emit('personList', users.getPersonByRoom(userDeleted.room))
  })

  client.on('privateMessage', (data) => {
    const person = users.getPerson(client.id)
    client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message))
  })
})