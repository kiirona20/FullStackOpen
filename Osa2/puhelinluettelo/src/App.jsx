import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const Persons = ({persons, newFilter, deletePerson}) => {  
  return(
    <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
      <Person key={person.name} person={person} deletePerson={deletePerson}/>
      )}
    </div>  
      )
}

const Person = ({person, deletePerson}) => {
  return(
    <p>{person.name} {person.number} <button onClick={()=>deletePerson(person.id)}>delete</button></p>
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
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)


  useEffect(() => {
    personService
      .getAll()
        .then(response => {
        setPersons(response)
      })
  }, [])

const addPerson = (event) =>{
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }
  const oldPerson = persons.find(n => n.name === newName)
  if (oldPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService.updateNumber(oldPerson.id, personObject).then
        (returnedPerson => {
          setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
          setNotification(`${newName} number changed to ${newNumber}`)
          setTimeout(()=>{
            setNotification(null)
          },3000)        
        }).catch(error => {
          setErrorNotification(`Information of ${newNumber} was already been removed from server`)
          setTimeout(()=>{
            setErrorNotification(null)
          },5000)
          setPersons(persons.filter(n => n.id !== oldPerson.id))   
        })
        setNewName('')
        setNewNumber('')

      }
  }
  else {
      personService.create(personObject)
      .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      })
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${personObject.name}`)
      setTimeout(()=> {
        setNotification(null)
      }, 5000)
    }
  
}
const deletePerson = id => {
  const person = persons.find(n => n.id === id)
  personService.deleteContact(id)
  .then(deletedPerson => {
    if(window.confirm(`Delete ${deletedPerson.name}?`)){
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
  }      
  setNotification(`deleted ${deletedPerson.name}`)
  setTimeout(()=> {
    setNotification(null)
  }, 5000)
}).catch(error => {
  setErrorNotification(`Information of ${newNumber} was already been removed from server`)
  setTimeout(()=>{
    setErrorNotification(null)
  },5000) 
  setPersons(persons.filter(n => n.id !== id))
})
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
      <Notification message={notification} />
      <ErrorNotification message={errorNotification} />
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePerson={handlePerson}
      newNumber={newNumber} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App