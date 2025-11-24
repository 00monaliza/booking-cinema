import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div>
      <NavBar />
      <main style={{minHeight: '70vh'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div>📍 Мангилик Ел, 51/5 • ☎️ +7 (776) 115-03-02</div>
        </div>
      </footer>
    </div>
  )
}
