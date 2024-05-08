import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Titlen testausta',
    author: 'Authorin testausta'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Titlen testausta Authorin testausta')
  expect(element).toBeDefined()

})
test('Like button testing', async () => {
  const blog = {
    title: 'Titlen testausta',
    author: 'Authorin testausta',
    likes: 2
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})