import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useField from '../hooks'
import { updateLikes, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = ({ blogs, currentUser }) => {
  const { resetValue: resetComment, ...comment } = useField('')
  const dispatch = useDispatch()
  const id = useParams().id

  let blog

  blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    if (blog.user) {
      blog = { ...blog, user: blog.user.id }
    }

    try {
      dispatch(updateLikes(blog))
    } catch (error) {
      dispatch(setNotification('error', 'cannot like blog', 5))
    }
  }

  const handleRemove = () => {
    if (blog.user) {
      blog = { ...blog, user: blog.user.id }
    }
    if (confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('error', `${error}`))
      }
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log(comment.value)
    dispatch(addComment(blog.id, comment.value))
    resetComment()
  }

  const CommentForm = () => {
    return (
      <form onSubmit={handleCommentSubmit} style={{ marginBottom: '1rem' }}>
        <input {...comment} name='comment'/>
        <button type='submit' className='siteButton'>add comment</button>
      </form>
    )
  }

  const textStyle = {
    marginTop: 0,
    marginBottom: 0
  }

  const removeButton = () => {
    return (
      <button className="siteButton removeButton" onClick={handleRemove}>remove</button>
    )
  }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <div className='testDiv'>
        <a href={blog.url} data-testid='url'>{blog.url}</a>
        <p
          style={textStyle}
          data-testid='likes'>likes {blog.likes}
          <button data-testid="likeButton" style={textStyle} className="siteButton" onClick={handleLike}>like</button>
        </p>
        {blog.user ? <p style={textStyle}>added by {blog.user.name}</p> : null }
        {!blog.user && removeButton()}
        {(blog.user && blog.user.username === currentUser.username) && removeButton()}

        <h3>comments</h3>

        {CommentForm()}

        {(blog.comments.length === 0)
          ? <em>(no comments yet)</em>
          : <ul>
            {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>}
      </div>
    </div>
  )
}

export default BlogView