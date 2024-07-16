import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
      title: <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          id='title'
        />
      </div>
      <div>
      author: <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          id='author'
        />
      </div>
      <div>
      url :<input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          id='url'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
export default BlogForm

