import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'

import NotificationContext from '../createContext'


const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
  onSuccess:(newAnecdote) => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    dispatch({ type: "CREATE", payload: newAnecdote.content})
    setTimeout(()=>{
      dispatch({ type: "NULL"})
    },5000)
  },
  onError:()=> {
    dispatch({type: 'ERROR', payload: 'Some error happened :D'})
    setTimeout(()=>{
      dispatch({ type: "NULL"})
    },5000)  
  } 
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length > 4){
      newAnecdoteMutation.mutate({ content, votes: 0 })
    }
    else {
      dispatch({ type: "ERROR", payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(()=>{
        dispatch({ type: "NULL"})
      },5000)
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
