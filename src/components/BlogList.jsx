import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ user, blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id}  style={blogStyle} className='blogDiv'>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList
