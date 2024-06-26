import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="Title"
            placeholder='write title here'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="Author"
            placeholder='write author here'
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="Url"
            placeholder='write url here'
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm