import { useState } from 'react'


const Blog = ({ blog, addLike, deleteBlog, loggedInUser }) => {
  const [visible, setVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideWhenVisibleBUtton = { display: buttonVisible ? '' : 'none' }


  const toggleVisibility = () => {
    console.log(loggedInUser.name)
    console.log(blog.user.name)
    setVisible(!visible)
    setButtonVisible(blog.user.name === loggedInUser.name)

  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='partialView'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='fullView'>
        <div>
          <p>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>{blog.likes}<button onClick={addLike}>like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={deleteBlog} style={hideWhenVisibleBUtton}>REMOVE {'>'}:D</button>

        </div>
      </div>
    </div>

  )}

export default Blog