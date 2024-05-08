const Blog = ({ blog, handleLike, handleDelete, showRemoveButton }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      <button onClick={() => handleLike(blog)}>like</button> {blog.likes}
    </div>
    {showRemoveButton &&(
      <div>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    )}
  </div>
)

export default Blog