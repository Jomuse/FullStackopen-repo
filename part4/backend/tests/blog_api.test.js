const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')


const { application } = require('express')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

const api = supertest(app)

test('all blogs are returned and they are JSON-types', async () => {
  
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Heippa',
    author: 'Kimmo',
    url: 'kimmo/heippa',
    likes: 3
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContainEqual(
    'Heippa'
  )
})

test('remove a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete._id}`)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContainEqual(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})