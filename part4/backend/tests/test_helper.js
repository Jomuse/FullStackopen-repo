const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hejsan',
        author: 'Kalle',
        url: 'kalle/hejsan',
        likes: 3
      },
      {
        title: 'Morjesta',
        author: 'Jaakko',
        url: 'jaakko/morjesta',
        likes: 5
      },
]
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}