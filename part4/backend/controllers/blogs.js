const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try{
    const blog = await Blog.find({})
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).json(savedBlog)
    }
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(blog.title === null || blog.author === null || blog.url === null || blog.likes === null){
      response.status(400)
    } else{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)

  await blog.findByIdAndUpdate(request.params.id)
  const updatedBlog = await blog.put()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter