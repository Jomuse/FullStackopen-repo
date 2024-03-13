import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
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
      id: persons.length +1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    
  }

  const handleNameChange = (event) => {
     setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <li key={person.name}> {person.name}</li>)}
      </div>
    </div>
  )

}

export default App
