import React, { useState, useEffect } from 'react'
import puhelinluetteloService from './services/puhelinluettelo'
import './index.css'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <p>{person.name} {person.number} <DeleteButton id={person.id} handleDelete={handleDelete}></DeleteButton></p>
  )
}

const SearchForm = ({ handleSearch, newSearch }) => 
   (
    <form>
      <div>
        filter shown with <input onChange={handleSearch} value={newSearch} />
      </div>
    </form>
  );

const AddPersonForm = ({ handleNameChange, handleNumberChange, newName, newNumber, addName }) => (
  <form>
  <div>
    name: <input onChange={handleNameChange} value={newName} />
  </div>
  <div>
    number: <input onChange={handleNumberChange} value={newNumber} />
  </div>
  <div>
    <button type="submit" onClick={addName}>add</button>
  </div>
</form>
)

const DeleteButton = ({ id, handleDelete }) => (
  <button onClick={() => handleDelete(id)}>Delete</button>
)

const ShowNumbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person} handleDelete={handleDelete} /> )}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  
  useEffect(() => {
    puhelinluetteloService.getAll().then(data => setPersons(data))
  }, [])

  useEffect(() => {
    if (message) {
      const messageTimer = setTimeout(() => {
        setMessage(null)
        setStatus('')
      }, 3000)
      return () => clearTimeout(messageTimer)
    }
  }, [message])

  const addName = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)

    if (person) {
      if (person && window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber}
        puhelinluetteloService.update(person.id, updatedPerson).then( returnedData => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedData))
          setNewName('')
          setNewNumber('')
          setStatus('success')
          setMessage(`Phone number changed for ${newName}`)
        }).catch(error => {
          setStatus('error')
          setMessage(`'${person.name}' has already been deleted from server`)
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      puhelinluetteloService.create(newPerson).then(
        returnedData => {
          setPersons(persons.concat(returnedData))
          setStatus('success')
          setMessage(`Added ${newName}`)
          setNewName('')
          setNewNumber('')
        }
      )
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (person && window.confirm(`Delete ${person.name}?`)) {
      puhelinluetteloService.del(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setStatus('success')
        setMessage(`Deleted ${person.name}`)
      }).catch(error => {
        setStatus('error')
        setMessage(`the note '${person.name}' was already deleted from server`)
        setPersons(person.filter(n => n.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const personsToShow = (newSearch === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <Notification message={message} status={status} />
      <h2>Phonebook</h2>
      <SearchForm handleSearch={handleSearch} newSearch={newSearch} />
      <h2>Add a new</h2>  
      <AddPersonForm 
        handleNameChange={handleNameChange} 
        newName={newName} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber} 
        addName={addName} 
      />
      <h2>Numbers</h2>
      <ShowNumbers persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
