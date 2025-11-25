import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/MyBookings.css'

function MyBookings({ user }) {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [sessions, setSessions] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    Promise.all([
      api.getUserBookings(),
      api.getSessions()
    ])
      .then(([bookingsData, sessionsData]) => {
        setBookings(bookingsData)
        
        // Create lookup map
        const sessionsMap = {}
        sessionsData.forEach(s => sessionsMap[s.id] = s)
        setSessions(sessionsMap)
      })
      .catch(err => {
        console.error('Error loading bookings:', err)
        setError(err.message || 'Ошибка при загрузке броней')
      })
      .finally(() => setLoading(false))
  }, [user, navigate])

  if (!user) return null
  if (loading) return <div className="container"><p>Загружаем ваши брони...</p></div>

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1>🎫 Мои билеты</h1>

        {error && <div className="error-message">{error}</div>}

        {bookings.length === 0 ? (
          <div className="empty-state">
            <p>У вас еще нет забронированных билетов</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Выбрать фильм
            </button>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map(booking => {
              const session = sessions[booking.session?.id]
              const film = session?.film
              const seats = booking.seatNumbers?.join(', ') || 'N/A'
              
              return (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{film?.title || 'Неизвестный фильм'}</h3>
                    <span className="status">{booking.status}</span>
                  </div>
                  
                  <div className="booking-details">
                    <div className="detail">
                      <span className="label">📅 Дата:</span>
                      <span>{session?.startTime ? new Date(session.startTime).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="detail">
                      <span className="label">⏰ Время:</span>
                      <span>{session?.startTime ? new Date(session.startTime).toLocaleTimeString() : 'N/A'}</span>
                    </div>
                    <div className="detail">
                      <span className="label">🎪 Зал:</span>
                      <span>{session?.hall || 'N/A'}</span>
                    </div>
                    <div className="detail">
                      <span className="label">🪑 Места:</span>
                      <span className="seats">{seats}</span>
                    </div>
                    <div className="detail">
                      <span className="label">💾 Забронировано:</span>
                      <span>{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="booking-price">
                    <strong>₸ {(booking.seatNumbers?.length || 0) * 1000 || '0'}</strong>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
