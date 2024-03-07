import { useState } from 'react'
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
const Persons = ({persons}) => {
  return(
    <div>
  {persons.map(person => 
    <li key={person.name}> {person.name} {person.number}</li>)}
  </div>
  )
  }


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    console.log("klikkaus", event.target)
    console.log("Nimi on", newName)
    //some tarkistaa listan ja vertaa löytyykö newName(lisätty nimi) valmiiksi listasta
    if(persons.some((nimi) => newName === nimi.name)){
      return alert(`${newName} is already in the phonebook`)
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    
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
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons}/>
      </div>
    </div>
  )

}

export default App
