import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sessions from './pages/Sessions'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBookings from './pages/MyBookings'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'
import './styles/App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        console.error('Failed to parse user data:', err)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <Router>
      <div className="app-layout">
        <NavBar user={user} onLogout={handleLogout} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions/:filmId" element={<Sessions />} />
            <Route path="/booking/:sessionId" element={<Booking user={user} />} />
            <Route path="/login" element={<Login onLoginSuccess={(u) => setUser(u)} />} />
            <Route path="/register" element={<Register onRegisterSuccess={(u) => setUser(u)} />} />
            <Route path="/my-bookings" element={<MyBookings user={user} />} />
            <Route path="/bookings" element={<Bookings user={user} />} />
            <Route path="/admin" element={<Admin user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
