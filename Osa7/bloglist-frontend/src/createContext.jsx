import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.payload
    case 'CREATE':
      return `blog '${action.payload.title}' by ${action.payload.author} created`
    case 'NULL':
      return null
    case 'DELETE':
      return `blog ${action.payload.title} deleted`
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
export default NotificationContext
