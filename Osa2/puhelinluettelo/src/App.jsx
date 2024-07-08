import { useState } from 'react'
const Person = ({person}) => {
  return(
  <p>{person.name} {person.number}</p>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


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
  setNewNumber(event.target.value)
}

const handleFilter = (event) => {
  console.log(event.target.value)
  
}
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input value={newFilter}
      onChange={handleFilter}/> 
      <h2>add a new</h2>
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
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
      <Person key={person.name} person={person}/>
      )}
    </div>
  )

}

export default App