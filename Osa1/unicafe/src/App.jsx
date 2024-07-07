import { useState } from 'react'



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("This is before the click", good)
    const updatedScore = good + 1
    setGood(updatedScore)
    console.log("This is after the click", updatedScore)

  }

  const handleNeutralClick = () => {
    const updatedScore = neutral + 1
    setNeutral(updatedScore)
  }

  const handleBadClick = () => {
    const updatedScore = bad + 1
    setBad(updatedScore)
  }



  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button>    
        <button onClick={handleBadClick}>Bad</button>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>


    </div>
  )
}

export default App