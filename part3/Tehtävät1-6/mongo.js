const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jomus:${password}@cluster0.kntoprx.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: `${name}`,
  number: `${number}`,
})
if(name == undefined || number == undefined){
  Person
  .find({})
  .then(result => {
    console.log("Phonebook:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}else{
  person.save().then(result => {
    console.log(`added ${name} number ${number} to a phonebook`)
    mongoose.connection.close()
})
}