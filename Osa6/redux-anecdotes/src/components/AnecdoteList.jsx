import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const anecdoteList = () => {
    const anecdotes = useSelector(state => state.content
    .filter(i=>i.content.includes(state.filter))
    .sort((a,b)=> b.votes-a.votes))
    const dispatch = useDispatch()
    const vote = (id) => {
      dispatch(addVote(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
    </div>
    )
}

export default anecdoteList
