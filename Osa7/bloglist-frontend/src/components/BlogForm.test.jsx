import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)
  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')

  const sendButton = screen.getByText('create')

  await user.type(title, 'testing a form...')
  await user.type(author, 'lol')
  await user.type(url, '123')

  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('lol')
  expect(createBlog.mock.calls[0][0].url).toBe('123')
})
