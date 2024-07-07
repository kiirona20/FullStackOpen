import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Headers text="statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={props.total} />
          <StatisticLine text="average" value ={props.average} />
          <StatisticLine text="positive" value ={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const Headers = ({text}) => {
  return(<h1>{text}</h1>)
}

const StatisticLine = ({text, value}) => {
  if (text === "positive"){
    return (  
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>)
  }
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Button = ({handleClick, text}) => {
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const [reviews, setReviews] = useState({
    good:0, neutral:0, bad:0, total:0, score:0
  })
  const [statistics, setStatistics] = useState({
    average:0, positivePercentage:0
  })



  const handleGoodClick = () => {
    const newReviews = {
      ...reviews,
      good: reviews.good + 1,
      total: reviews.total + 1,
      score: reviews.score + 1
    }
    setReviews(newReviews)
    const updatedStatistics = {
      average: newReviews.score/newReviews.total,
      positivePercentage: newReviews.good/newReviews.total * 100
    }
    setStatistics(updatedStatistics)
  }

  const handleNeutralClick = () => {
    const newReviews = {
      ...reviews,
      neutral: reviews.neutral + 1,
      total: reviews.total + 1
    }
    setReviews(newReviews)
    const updatedStatistics = {
      average: newReviews.score/newReviews.total,
      positivePercentage: newReviews.good/newReviews.total * 100
    }
    setStatistics(updatedStatistics)

  }

  const handleBadClick = () => {
    const newReviews = {
      ...reviews,
      bad: reviews.bad + 1,
      total: reviews.total + 1,
      score: reviews.score - 1
    }
    setReviews(newReviews)
    const updatedStatistics = {
      average: newReviews.score/newReviews.total,
      positivePercentage: newReviews.good/newReviews.total * 100
    }
    setStatistics(updatedStatistics)
  }

 



  return (
    <div>
        <Headers text="give feedback"/>
        <Button handleClick={handleGoodClick} text='good'/>
        <Button handleClick={handleNeutralClick} text='neutral'/>
        <Button handleClick={handleBadClick} text='bad'/>
        <Statistics good={reviews.good} neutral={reviews.neutral} bad={reviews.bad} total={reviews.total} average={statistics.average} positive={statistics.positivePercentage}/>
    </div>
  )
}

export default App