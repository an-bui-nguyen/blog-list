import { Link } from "react-router-dom"

const Navigation = ({ user, handleLogout }) => {
  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to='/' className="nav-link px-2 link-body-emphasis">blogs</Link></li>
          <li><Link to='/users' className="nav-link px-2 link-body-emphasis">users</Link></li>
        </ul>

        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <em>{user.name} logged in</em>
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation