import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  function logout(){
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">🎬 Кинотеатр Online</Link>
        <div className="nav-links">
          <Link to="/">Фильмы</Link>
          <Link to="/booking">Забронировать</Link>
          <Link to="/bookings">Мои билеты</Link>
          {role === 'ADMIN' && <Link to="/admin">Админ</Link>}
          {!username ? (
            <>
              <Link to="/login" className="btn small">Вход</Link>
              <Link to="/register" className="btn small ghost">Регистрация</Link>
            </>
          ) : (
            <>
              <span className="user">{username}</span>
              <button onClick={logout} className="btn small">Выход</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
