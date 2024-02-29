import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  
  const handleRand = () => {
    console.log(selected)
    setSelected(Math.floor(Math.random(selected) * 8))
  }
  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote)
  }
  const max = Math.max(...vote)
  const index = vote.indexOf(max)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <p><Button handleClick={handleRand} text='Next Anecdote' />
      <Button handleClick={handleVote} text='Vote'/> </p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {Math.max(...vote)} votes</p>
    </div>
  )
}

export default App