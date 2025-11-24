const BASE_URL = '/api/v1'
const AUTH_URL = '/api/users'

export const api = {
  async login(username, password) {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Login failed')
    return res.json()
  },

  async register(username, password) {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Registration failed')
    return res.json()
  },

  async getFilms() {
    const res = await fetch(`${BASE_URL}/films`)
    if (!res.ok) throw new Error('Failed to fetch films')
    return res.json()
  },

  async getSessionsByFilm(filmId) {
    const res = await fetch(`${BASE_URL}/sessions/film/${filmId}`)
    if (!res.ok) throw new Error('Failed to fetch sessions')
    return res.json()
  },

  async getSessions() {
    const res = await fetch(`${BASE_URL}/sessions`)
    if (!res.ok) throw new Error('Failed to fetch sessions')
    return res.json()
  },

  async bookSeats(sessionId, seatNumbers) {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ sessionId, seatNumbers })
    })
    if (!res.ok) throw new Error('Booking failed')
    return res.json()
  },

  async getUserBookings() {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/bookings/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Failed to fetch bookings')
    return res.json()
  }
}
