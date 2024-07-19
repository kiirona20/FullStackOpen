import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "ERROR":
          return action.payload
      case "VOTE":
          return `anecdote '${action.payload.content}' voted`
      case "CREATE":
          return `anecdote '${action.payload}' created`
      case "NULL":
          return null
      default:
          return state
    }
  }



const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
          {props.children}
        </NotificationContext.Provider>
      )

}
export default NotificationContext