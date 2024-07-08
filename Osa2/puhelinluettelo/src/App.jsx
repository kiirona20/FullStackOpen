import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const Person = ({person}) => {
  return(
  <p>{person.name} {person.number}</p>
  )
}

const addPerson = (event) =>{
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }
  if (persons.some(value => value.name === newName)) {
    alert(`${newName} is already added to phonebook`)
  }
  else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

}

const handlePerson = (event) => {
  setNewName(event.target.value)
}

const handleNumber = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePerson}/>       
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumber}
          />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
      <Person key={person.name} person={person}/>
      )}
    </div>
  )

}

export default App