import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducers'

const anecdoteList = () => {
    const anecdotes = useSelector(state => state.content
    .filter(i=>i.content.includes(state.filter))
    .sort((a,b)=> b.votes-a.votes))
    const dispatch = useDispatch()
    
    
    const vote = (anecdote) => {
      dispatch(addVote(anecdote))
      console.log("we here")
      dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    }

    return(
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
    </div>
    )
}

export default anecdoteList
