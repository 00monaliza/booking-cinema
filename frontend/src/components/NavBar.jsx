import { Link, useNavigate } from 'react-router-dom'

function NavBar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <Link to="/" className="brand">🎬 Cinema Booking</Link>
          <div className="nav-buttons">
            {user ? (
              <>
                <span style={{ color: 'white', alignSelf: 'center' }}>Welcome, {user.username}!</span>
                <Link to="/booking" className="btn">Book Ticket</Link>
                <Link to="/bookings" className="btn">My Bookings</Link>
                {user.role === 'ADMIN' && <Link to="/admin" className="btn">Admin</Link>}
                <button className="btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
