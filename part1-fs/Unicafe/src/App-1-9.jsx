import { useState } from 'react'

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
    <div>
      <p>{props.text1} {props.number1}</p>
      <p>{props.text2} {props.number2}</p>
      <p>{props.text3} {props.number3}</p>
      <p>{props.text4} {props.allClicks}</p>
      <p>{props.text5} {(props.number1-props.number3)/(props.allClicks)}</p>
      <p>{props.text6} {props.number1 / props.allClicks * 100} %</p>
    </div>
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
      text1='good:' number1={good}
      text2='neutral:' number2={neutral}
      text3='bad:' number3={bad}
      text4='all:'
      text5='all:'
      text6='positive:' />
    </div>
  )
}

export default App