import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
    updateAnecdote(state, action){
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    }
  }


})

export const { appendAnecdote, setAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content =>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (content) => {
  return async dispatch => {
    const changedAnecdote = {...content, votes: content.votes + 1}
    const updatedAnecdote = await anecdoteService.update(content.id, changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}



export default anecdoteSlice.reducer