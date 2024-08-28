import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
// APIKEY should be defined in environment variable
const api_key = process.env.REACT_APP_OPENWEATHER_KEY;

const getAll = () => {
    return axios.get(baseUrl + 'all')
}

const getWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    return axios.get(url)
}

export default {getAll, getWeather}