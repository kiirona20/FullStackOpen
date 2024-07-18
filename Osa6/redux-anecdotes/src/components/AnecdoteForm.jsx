import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate } from '../reducers/notificationReducers'
import anecdoteService from '../services/anecdotes'


const anecdoteForm = () => {


    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))


        dispatch(notificationCreate(newAnecdote))
        setTimeout(()=> {
            dispatch(notificationCreate(null)) 
        }, 5000)
    }



    return(
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type="submit">create</button>
        </form>
    </div>
    )
}

export default anecdoteForm