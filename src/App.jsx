import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserTable from './components/UserTable'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getAllUsers } from './reducers/userReducer'
import { getUserFromLocalStorage, setUser } from './reducers/authReducer'
import {
  Link,
  Routes,
  Route
} from 'react-router-dom'
import {
  Button,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.auth)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])


  useEffect(() => {
    dispatch(getUserFromLocalStorage())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedPhonebookappUser')
    dispatch(setUser(null))
    location.reload()
  }

  const padding = {
    paddingRight: 5
  }

  if (user) {
    return (
      <div className='container'>
        <div style={{ marginBottom: '1.5rem', marginTop: '0' }}>
          <Link style={padding} to='/'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
          <em>{user.name} logged in</em>
          <button className="siteButton" onClick={handleLogout}>Log out</button>
        </div>

        {/* <Navigation user={user} handleLogout={handleLogout}/> */}

        <h2>blogs</h2>
        <Notification />

        <BlogForm />

        <Routes>
          <Route path='/' element={<BlogList user={user} blogs={blogs}/>}/>
          <Route path='/users' element={<UserTable />}/>
          <Route path='/users/:id' element={<UserView users={users}/>}/>
          <Route path='/blogs/:id' element={<BlogView currentUser={user} blogs={blogs}/>}/>
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App

{/* <AppBar position="static">
<Toolbar>
  <IconButton edge="start" color="inherit" aria-label="menu">
  </IconButton>
  <Button color="inherit" component={Link} to='/'>
  blogs
  </Button>
  <Button color="inherit" component={Link} to='/users'>
  users
  </Button>
  <em>{user.name} logged in</em>
  <Button color='inherit' onClick={handleLogout}>
      logout
  </Button>
</Toolbar>
</AppBar> */}
