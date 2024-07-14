import { useState } from 'react'


const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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


const AddPersonForm = ({handleNameChange, handleNumberChange, newName, newNumber, addName}) => (
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

const ShowNumbers = ({persons}) => {
  const personsToShow = persons;
  return (
    <div>
  {personsToShow.map(person => 
    <Person key={person.name}  person={person} /> )}
  </div>
  );
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
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const personExists = persons.some(person => person.name === newName)

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
    //console.log('button clicked', event.target)
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
      <h2>Phonebook</h2>
      <SearchForm handleSearch={handleSearch} newSearch={newSearch} />
      <h2>Add a new</h2>  
      <AddPersonForm handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} addName={addName} />
      <h2>Numbers</h2>
      <ShowNumbers persons={personsToShow} />
    </div>
  )

  

}


export default App