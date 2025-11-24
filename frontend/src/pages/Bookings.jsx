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
  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Загружаем ваши билеты...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '60vh', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px', color: '#e50914' }}>📋 Мои билеты</h1>
        {error && <div className="error">{error}</div>}
        {bookings.length === 0 ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', color: '#999' }}>😔 У вас нет билетов</p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#e50914',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Купить билет
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {bookings.map(booking => (
              <div key={booking.id} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#e50914', marginBottom: '10px' }}>Билет #{booking.id}</h3>
                <p><strong>🎬 Фильм:</strong> {booking.filmTitle}</p>
                <p><strong>🕐 Время:</strong> {booking.time}</p>
                <p><strong>🎭 Зал:</strong> {booking.hallNumber}</p>
                <p><strong>🪑 Места:</strong> {booking.seatNumbers?.join(', ') || '—'}</p>
                <p><strong>✅ Статус:</strong> <span style={{ color: '#27ae60' }}>Активен</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
