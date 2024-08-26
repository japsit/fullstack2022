import './App.css';
import { useState, useEffect } from 'react';
import countryService from './services/countries';

const Search = ({handleChange, value}) => (
  <div>
    find countries<input onChange={handleChange} value={value}></input>
  </div>
)

const Result = () => {

}

function App() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    countryService
    .getAll(response => {
      setResult(response.data)
    })
  })


  const handleChange = (event) => {
    console.log('Value changed:' + value)
    setValue(event.target.value)
  }

  return (
    <div className="App">
      <Search handleChange={handleChange} value={value}/>
      <Result/>
    </div>
  );
}

export default App;
