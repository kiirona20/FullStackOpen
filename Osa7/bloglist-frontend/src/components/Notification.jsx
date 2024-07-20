import { useContext } from 'react'
import NotificationContext from '../createContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  console.log('THIS IS THE NOTIFICATION', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notification === null) return null

  return (
    <div style={style} className="error">
      {notification}
    </div>
  )
}

export default Notification
