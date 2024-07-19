import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducers'
import notificationReducer from './reducers/notificationReducers'

const store = configureStore({
  reducer: {
    content: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store