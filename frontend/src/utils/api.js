const BASE_URL = '/api/v1'
const AUTH_URL = '/api/users'

export const api = {
  async login(username, password) {
    try {
      const res = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || data.details || 'Login failed')
      }
      
      // API возвращает { token, username, role }
      // Преобразуем в { token, user: { username, role } }
      return {
        token: data.token,
        user: {
          username: data.username,
          role: data.role
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  },

  async register(username, password) {
    try {
      const res = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || data.details || 'Registration failed')
      }
      
      // API возвращает { token, username, role }
      // Преобразуем в { token, user: { username, role } }
      return {
        token: data.token,
        user: {
          username: data.username,
          role: data.role
        }
      }
    } catch (err) {
      console.error('Register error:', err)
      throw err
    }
  },

  async getFilms() {
    try {
      const res = await fetch(`${BASE_URL}/films`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch films')
      return data
    } catch (err) {
      console.error('Get films error:', err)
      throw err
    }
  },

  async getSessionsByFilm(filmId) {
    try {
      const res = await fetch(`${BASE_URL}/sessions/film/${filmId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch sessions')
      return data
    } catch (err) {
      console.error('Get sessions error:', err)
      throw err
    }
  },

  async getSessions() {
    try {
      const res = await fetch(`${BASE_URL}/sessions`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch sessions')
      return data
    } catch (err) {
      console.error('Get sessions error:', err)
      throw err
    }
  },

  async getBookedSeats(sessionId) {
    try {
      const res = await fetch(`${BASE_URL}/bookings/session/${sessionId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch booked seats')
      return data
    } catch (err) {
      console.error('Get booked seats error:', err)
      throw err
    }
  },

  async bookSeats(sessionId, seatNumbers) {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')
      
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId, seatNumbers })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      return data
    } catch (err) {
      console.error('Booking error:', err)
      throw err
    }
  },

  async getUserBookings() {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')
      
      const res = await fetch(`${BASE_URL}/bookings/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch bookings')
      return data
    } catch (err) {
      console.error('Get bookings error:', err)
      throw err
    }
  }
}
