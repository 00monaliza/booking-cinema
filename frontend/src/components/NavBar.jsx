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
          <Link to="/" className="brand">🎬 CinemaBook</Link>
          <div className="nav-buttons">
            {user ? (
              <>
                <span className="nav-user-info">👤 {user.username}</span>
                <Link to="/my-bookings" className="btn">Мои билеты</Link>
                {user.role === 'ADMIN' && <Link to="/admin" className="btn">Админ</Link>}
                <button className="btn" onClick={handleLogout}>Выход</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Вход</Link>
                <Link to="/register" className="btn">Регистрация</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
