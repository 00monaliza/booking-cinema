import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
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
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={(u) => setUser(u)} />} />
        <Route path="/register" element={<Register onRegisterSuccess={(u) => setUser(u)} />} />
        <Route path="/booking" element={<Booking user={user} />} />
        <Route path="/bookings" element={<Bookings user={user} />} />
        <Route path="/admin" element={<Admin user={user} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
