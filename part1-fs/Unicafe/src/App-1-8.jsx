import { useState } from 'react'

const Statistics = (props) => {
  //kaikki palautteet

  //keskiarvo
  return(
    <div>
      <p>{props.text1} {props.number1}</p>
      <p>{props.text2} {props.number2}</p>
      <p>{props.text3} {props.number3}</p>
      <p>{props.text4} {props.number1 + props.number2 + props.number3}</p>
      <p>{props.text5} {(props.number1-props.number3)/(props.number1 + props.number2 + props.number3)}</p>
      <p>{props.text6} {props.number1 / (props.number1 + props.number2 + props.number3) * 100} %</p>
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
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h1>Statistics</h1>
      <Statistics text1='good:' number1={good}
      text2='neutral:' number2={neutral}
      text3='bad:' number3={bad}
      text4='all:'
      text5='average:'
      text6='positive' />
    </div>
  )
}

export default App