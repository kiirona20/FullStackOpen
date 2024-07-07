import { useState } from 'react'

const DisplayStatistics = ({good,neutral,bad,total,average,positive}) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive}%</p>


    </div>
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
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button>    
        <button onClick={handleBadClick}>Bad</button>
        <DisplayStatistics good={reviews.good} neutral={reviews.neutral} bad={reviews.bad} total={reviews.total} average={statistics.average} positive={statistics.positivePercentage}/>



    </div>
  )
}

export default App