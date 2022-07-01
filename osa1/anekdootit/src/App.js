import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Title = (props) => <h1>{props.text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState({})
  const [mostVoted, setMostVoted] = useState({"anecdote": 0, "votes": 0})

  

  const handleVote = () => {
    let newVotes = {
      ...votes
    }
    let vote = votes[selected] + 1 || 1
    newVotes[selected] = vote
    if (vote > mostVoted["votes"]) {
      setMostVoted({"anecdote": selected, "votes": vote})
    }
    setVote(newVotes)
  }

  return (
    <div>
      <Title text="Anecdote of the day"></Title>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes</p>
      <Button handleClick={handleVote} text="Vote"></Button>
      <Button handleClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} text="Next anecdote"></Button>
      <Title text="Anecdote with most votes" />
      <p>{anecdotes[mostVoted.anecdote]} has {mostVoted.votes} votes</p>
    </div>
  
  )
}

export default App