const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try{
    const blog = await Blog.find({}).populate('user', { username: 1, name: 1})
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).json(savedBlog)
    }
  } catch(error) {
    next(error)
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })


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