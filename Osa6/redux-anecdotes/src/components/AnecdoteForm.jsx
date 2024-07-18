import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate } from '../reducers/notificationReducers'


const anecdoteForm = () => {


    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(notificationCreate(anecdote))
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