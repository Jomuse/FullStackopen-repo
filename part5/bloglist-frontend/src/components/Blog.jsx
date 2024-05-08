const Blog = ({ blog, handleLike, handleDelete }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      <button onClick={() => handleLike(blog)}>like</button> {blog.likes}
    </div>
    <div>
      <button onClick={() => handleDelete(blog)}>remove</button>
    </div>
  </div> 
)

export default Blog