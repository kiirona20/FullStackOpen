import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'



const App = () => {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState({})
  const [allCountries, setAllcountries] = useState(null)
  const [filteredCountries, setFilter] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllcountries(response.data.map(i=>i.name.common))
      })
  
}, [])


  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries}`)
        .then(response => {
          setInfo(response.data)
        })
    }
  }, [filteredCountries])


  const handleChange = (event) => {
    setValue(event.target.value)
    setFilter(allCountries.filter(i=> i.toLowerCase()
      .includes(event.target.value.toLowerCase())))
    //console.log(filteredCountries)
  }
//        {JSON.stringify(allCountries, null, 2)}

  return (
    <div>
        Find countries: <input value={value} onChange={handleChange} />
        
        <Filter filteredCountries={filteredCountries} info={info}/>
    </div>
  )
}
export default App