import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useContext } from 'react'

import NotificationContext from './createContext'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, dispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({ type: 'ERROR', payload: 'wrong password or username' })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      const addedBlog = { ...returnedBlog, user: user }
      setBlogs(blogs.concat(addedBlog))
      dispatch({ type: 'CREATE', payload: addedBlog })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 5000)
    } catch {
      dispatch({ type: 'ERROR', payload: 'failed to add blog' })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 5000)
    }
  }
  const like = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(id, changedBlog)
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : changedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch {
      console.log(`Blog ${blog.title} was already removed`)
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        console.log('This is the blog that needs to be delete: ', blog)
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((i) => i.id !== id))
        dispatch({ type: 'DELETE', payload: blog })
        setTimeout(() => {
          dispatch({ type: 'NULL' })
        }, 5000)
      } catch {
        dispatch({ type: 'ERROR', payload: 'failed to delete blog' })
        setTimeout(() => {
          dispatch({ type: 'NULL' })
        }, 5000)
      }
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => like(blog.id)}
          deleteBlog={() => {
            deleteBlog(blog.id)
          }}
          loggedInUser={user}
        />
      ))}
    </div>
  )
}

export default App
