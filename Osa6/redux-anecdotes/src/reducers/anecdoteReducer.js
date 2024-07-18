import { createSlice } from "@reduxjs/toolkit"


const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      console.log(content)
      state.push(content)
    },
    addVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n=>n.id===id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }


})

export const { createAnecdote, addVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer