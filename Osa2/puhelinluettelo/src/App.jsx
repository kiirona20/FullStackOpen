import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Persons = ({persons, newFilter}) => {
  return(
    <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
      <Person key={person.name} person={person}/>
      )}
    </div>  
      )
}

const Person = ({person}) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}
const Filter = (props) => {
  return(
  <div>
    filter shown with: <input value={props.newFilter}
    onChange={props.handleFilter}/> 
  </div>
  )
}

const PersonForm = (props) => {
return(
  <form onSubmit={props.addPerson}>
  <div>
    name: <input value={props.newName}
    onChange={props.handlePerson}/>       
  </div>
  <div>
    number: <input value={props.newNumber}
    onChange={props.handleNumber}
    />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      personService.create(personObject)
      .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      })
    }
  
}

  const handlePerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    
}
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePerson={handlePerson}
      newNumber={newNumber} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )

}

export default App