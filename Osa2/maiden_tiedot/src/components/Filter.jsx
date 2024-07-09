const Filter = ({filteredCountries, info, showInstant}) =>{
  
  console.log(filteredCountries)
  
  if (filteredCountries.length > 10 || filteredCountries.length === 0) {
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
  else if (filteredCountries.length <= 10 && filteredCountries.length > 1){
      return(
        <div>
          {filteredCountries.map(i=> 
            <div className="countries" key={i}>
            <li>{i}</li>
            <button onClick={()=>showInstant(i)}>show</button>
            </div>
        )}
        </div>
      )
    }
    else if (filteredCountries.length === 1 && info.name){
    const everyLanguageList = Object.entries(info.languages)
    
    return(
    <div>
      <h1>{info.name.common}</h1>
      <p>{info.capital}</p>
      <p>{info.area}</p>
      <img src={info.flags.png}></img>
      <h3>languages:</h3>
      {everyLanguageList.map(i=>
        <li key={i}>{i[1]}</li>
      )}
    </div>
    )
    }
  
  }
  export default Filter