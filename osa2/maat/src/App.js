import './App.css';
import { useState, useEffect } from 'react';
import countryService from './services/countries';

const Search = ({handleChange, value}) => (
  <div>
    find countries<input onChange={handleChange} value={value}></input>
  </div>
)

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const lat = country.latlng[0];
  const lon = country.latlng[1];

  useEffect(() => {
    countryService
      .getWeather(lat, lon)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [lat, lon]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  return (
    <div>
      <h2>Weather in {country.name.official}</h2>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <img src={icon}></img>
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

const Result = ({ result, filter, onSelectCountry }) => {
  const showResults = result.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
  const pituus = showResults.length
  /* Jos maita on liian paljon näytettäväksi */
  if (pituus > 10) {
    return <span>Too many matches, specify another filter</span>
  }
  /* Jos maita löytyy enemmän kuin yksi */
  if (pituus > 1) {
    return (
      <ul>
        {showResults.map(country => (
          <li key={country.name.official}>
            {country.name.official}
            <button onClick={() =>onSelectCountry(country.name.official)}>Show</button>
            </li>
        ))}
      </ul>
    );
  }
  if (pituus == 1) {
    const country = showResults[0]

    return (
      <div>
        <h1>{country.name.official}</h1>
      
        Capital {country.capital[0]}<br></br>
        Area {country.area}<br></br>
        <b>Languages:</b>
        <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
        </ul>
        <img src={country.flags.png}></img>
        <Weather country={country} />
      </div>
    )
  }
}

function App() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => {
      setResult(response.data)
    })
  }, [])


  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="App">
      <Search handleChange={handleChange} value={value}/>
      <Result result={ result } filter={ value } onSelectCountry={ setValue }/>
    </div>
  );
}

export default App;
