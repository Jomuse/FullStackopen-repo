require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())


const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.get('/info', (req, res) => {
  const time = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${time}</p>`)
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
  })
  /** 
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
  */

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
  /** 
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
  */
})

const generateId = () => {
  const min = Math.ceil(0)
  const max = Math.floor(500)
  return Math.round(Math.random() * (max - min))
}
app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }/** 
  if(persons.some((nimi) => body.name === nimi.name)){
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }
  */

  const person = new Person({
    name: body.name,
    number: body.number
  })
  /** 
  persons = persons.concat(person)
  res.json(person)
  */
 person.save().then(savedPerson => {
  res.json(savedPerson)
 })
})
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})