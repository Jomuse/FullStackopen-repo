/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
  const {addName, newName, handleNameChange, newNumber, handleNumberChange} = props
  return(
    <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Persons = (props) => {
  const {handlePersonDelete} = props
  return(
    <div>
  {props.persons.map(person => 
    <li key={person.name}> {person.name} {person.number}
      <button onClick={() => handlePersonDelete(person)}>delete</button>
    </li>
    )}
  </div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  let notification = ''
  if (message.includes('already')){
    notification = "error"
  } else if (message.startsWith('Added')){
    notification = "added"
  }
  return(
    <div className={notification}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    console.log("klikkaus", event.target)
    console.log("Nimi on", newName)
    //some tarkistaa listan ja vertaa löytyykö newName(lisätty nimi) valmiiksi listasta
    if(persons.some((nimi) => newName === nimi.name)){
      setErrorMessage(`${newName} is already in the phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
      }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setAddedMessage(`Added ${newName}`)
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
      return
    })
    
  }
  const handlePersonDelete = (person) => {
    
    if(window.confirm(`Delete ${person.name}`)){
      return(
        personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((henkilo) => henkilo.id !== person.id))
        })
      )
    }
  }

  const handleNameChange = (event) => {
     setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage || addedMessage} />
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} handlePersonDelete={handlePersonDelete}/>
      </div>
    </div>
  )

}

export default App
