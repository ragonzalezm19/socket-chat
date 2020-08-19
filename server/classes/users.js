class Users {
  constructor() {
    this.persons = []
  }

  addPerson(id, name, room) {
    const person = { id, name, room }
    this.persons.push(person)

    return this.persons
  }

  getPerson(id) {
    const person = this.persons.find(p => p.id === id)

    return person
  }

  getAllPersons = () => this.persons

  getPersonByRoom = (room) => this.persons.filter(p => p.room === room)


  deletePerson(id) {
    const personDeleted = this.getPerson(id)
    this.persons = this.persons.filter(p => p.id !== id)

    return personDeleted
  }
}

module.exports = {
  Users
}