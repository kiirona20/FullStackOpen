import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import.meta.env


const App = () => {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState({})
  const [allCountries, setAllcountries] = useState(null)
  const [filteredCountries, setFilter] = useState([])
  const [capital, setCapital] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [weather, setWeather] = useState([])


  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllcountries(response.data.map(i=>i.name.common))
      })
  
}, [])

const api_key = import.meta.env.VITE_SOME_KEY



  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries}`)
        .then(response => {
          setInfo(response.data)
          setCapital(response.data.capital)
        })
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
      }
  }, [filteredCountries])

  useEffect(()=> {
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
    .then(response => {
      setLatitude(response.data[0].lat)
      setLongitude(response.data[0].lon)
      console.log(response.data[0].lat)
      console.log(response.data[0].lon)

    })
  }, [capital])

  useEffect(()=>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
  }, [longitude, latitude])


  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(api_key)
    setFilter(allCountries.filter(i=> i.toLowerCase()
      .includes(event.target.value.toLowerCase())))
  }

  const showInstant = (name) => {
    setFilter([name])
  }

  return (
    <div>
        Find countries: <input value={value} onChange={handleChange} />
        
        <Filter filteredCountries={filteredCountries} info={info} showInstant={showInstant} weather={weather}/>
    </div>
  )
}
export default App