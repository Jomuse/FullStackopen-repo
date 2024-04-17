const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

    const user = await User.findById(blog.userId)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const updateBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true }
  )
  if(updateBlog){
    response.status(200).json(updateBlog)
  } else {
    response.status(400).json({error: 'Blog not found'})
  }
})

module.exports = blogsRouter