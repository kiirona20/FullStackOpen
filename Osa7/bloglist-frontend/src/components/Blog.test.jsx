import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'test123',
    author: '123test',
    url: '12345',
    likes: 0,
    user: {
      name: 'lol',
    },
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.partialView')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('test123')
})

test('Clicking button shows full info', async () => {
  const blog = {
    title: 'test123',
    author: '123test',
    url: '12345',
    likes: 0,
    user: {
      name: 'lol',
    },
  }

  const { container } = render(<Blog blog={blog} loggedInUser={blog.user} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.fullView')

  expect(div).not.toHaveStyle('display: none')

  expect(div).toHaveTextContent('test123')
  expect(div).toHaveTextContent('123test')
  expect(div).toHaveTextContent('12345')
  expect(div).toHaveTextContent(0)
  expect(div).toHaveTextContent('lol')
})

test('clicking like button twice calls event handle function twice', async () => {
  const blog = {
    title: 'test123',
    author: '123test',
    url: '12345',
    likes: 0,
    user: {
      name: 'lol',
    },
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} loggedInUser={blog.user} addLike={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
