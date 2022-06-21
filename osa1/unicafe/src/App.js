import { useEffect, useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Title = ({title}) => <h1>{title}</h1>
const StatisticLine = ({name, score}) => <tr><td>{name}</td><td>{score}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(()=> {
    setSum(good+neutral+bad)
    setAverage((good * 1 + bad * -1) / sum || 0)
    setPositive((good/sum*100 || 0) + ' %')
  })

  if (sum === 0) return <div><p>No feedback given.</p></div>

  return (
    <div>
  <Title title="Statistics" />
    <table><tbody>
    <StatisticLine name="Good" score={good} />
    <StatisticLine name="Neutral" score={neutral} />
    <StatisticLine name="Bad" score={bad} />
    <StatisticLine name="All" score={sum} />
    <StatisticLine name="Average" score={average} />
    <StatisticLine name="Positive" score={positive} />
    </tbody></table>
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title="Give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    
  )
}

export default App