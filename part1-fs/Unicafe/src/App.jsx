import { useState } from 'react'

const StatisticLine = (props) => {
  //tilastorivi eli hyvä: numero jne.
  return(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
      <td>{props.percent}</td>
    </tr>
  )
}

const Statistics = (props) => {
  //kaikki palautteet
  //keskiarvo
  if (props.allClicks < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
      <table>
        <tbody>
      <StatisticLine text="good:" value={props.number1}/>
      <StatisticLine text="neutral:" value={props.number2}/>
      <StatisticLine text="bad:" value={props.number3}/>
      <StatisticLine text="all:" value={props.allClicks}/>
      <StatisticLine text="average:" value={(props.number1-props.number3) / props.allClicks}/>
      <StatisticLine text="positive:" value={props.number1 / props.allClicks * 100} percent={"%"}/>
        </tbody>
      </table>
  )
}
const Button = (props) => {
  console.log(props)
  const {handleClick, text} = props
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  const handleBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }
  const handleNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text = 'good' />
      <Button handleClick={handleNeutral} text = 'neutral' />
      <Button handleClick={handleBad} text = 'bad' />
      <h1>Statistics</h1>
      <Statistics allClicks = {all} 
      number1={good}
      number2={neutral}
      number3={bad} />
    </div>
  )
}

export default App