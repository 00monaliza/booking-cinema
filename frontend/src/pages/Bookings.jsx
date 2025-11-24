import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

function Bookings({ user }) {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    api.getUserBookings()
      .then(setBookings)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [user, navigate])

  if (!user) return null
  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="page container">
      <h1>📋 My Bookings</h1>
      {error && <div className="error">{error}</div>}
      {bookings.length === 0 ? (
        <div className="info">No bookings yet. <a href="/booking">Book now!</a></div>
      ) : (
        <div className="grid">
          {bookings.map(booking => (
            <div key={booking.id} className="card">
              <h3>Booking #{booking.id}</h3>
              <p><strong>Film:</strong> {booking.filmTitle}</p>
              <p><strong>Session:</strong> Hall {booking.hallNumber} at {booking.time}</p>
              <p><strong>Seats:</strong> {booking.seatNumbers.join(', ')}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings
