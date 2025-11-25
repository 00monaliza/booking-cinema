import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Booking.css'

function Booking({ user }) {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [film, setFilm] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookedSeats, setBookedSeats] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const ROWS = 5
  const COLS = 10
  const TICKET_PRICE = 1000 // 1000 тенге

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    Promise.all([
      api.getSessions(),
      api.getBookedSeats(sessionId)
    ])
      .then(([sessions, bookings]) => {
        const current = sessions.find(s => String(s.id) === String(sessionId))
        if (!current) {
          setError('Сеанс не найден')
        }
        setSession(current)
        
        // Extract all booked seats from bookings
        const booked = bookings.flatMap(b => b.seatNumbers || [])
        setBookedSeats(booked)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [sessionId, user, navigate])

  const toggleSeat = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return // Can't select booked seat
    
    setSelectedSeats(prev =>
      prev.includes(seatNum)
        ? prev.filter(s => s !== seatNum)
        : [...prev, seatNum]
    )
  }

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Выберите хотя бы одно место')
      return
    }

    setProcessing(true)
    setError('')
    
    try {
      await api.bookSeats(sessionId, selectedSeats)
      navigate('/my-bookings')
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.message || 'Ошибка при бронировании')
    } finally {
      setProcessing(false)
    }
  }

  if (!user) return null
  if (loading) return <div className="container"><p>Загружаем информацию...</p></div>
  if (!session) return <div className="container error-message">Сеанс не найден</div>

  const totalPrice = selectedSeats.length * TICKET_PRICE

  return (
    <div className="booking-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">← Назад</button>

        <div className="booking-layout">
          {/* Left side - Seats */}
          <div className="seats-section">
            <h2>Выберите места</h2>
            
            <div className="screen">
              <p>ЭКРАН</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="seats-grid">
              {Array.from({ length: ROWS * COLS }, (_, i) => i + 1).map(seatNum => {
                const row = Math.floor((seatNum - 1) / COLS) + 1
                return (
                  <button
                    key={seatNum}
                    className={`seat ${
                      bookedSeats.includes(seatNum)
                        ? 'booked'
                        : selectedSeats.includes(seatNum)
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => toggleSeat(seatNum)}
                    disabled={bookedSeats.includes(seatNum)}
                    title={`Место ${row}-${(seatNum - 1) % COLS + 1}`}
                  >
                    {seatNum}
                  </button>
                )
              })}
            </div>

            <div className="legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Свободное</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Выбрано</span>
              </div>
              <div className="legend-item">
                <div className="seat booked"></div>
                <span>Занято</span>
              </div>
            </div>
          </div>

          {/* Right side - Summary */}
          <aside className="booking-summary">
            <h3>Итого заказа</h3>
            
            <div className="summary-details">
              <div className="detail-row">
                <span>Сеанс:</span>
                <strong>{session.startTime ? new Date(session.startTime).toLocaleTimeString() : 'N/A'}</strong>
              </div>
              <div className="detail-row">
                <span>Зал:</span>
                <strong>{session.hall || 'N/A'}</strong>
              </div>
              <div className="detail-row">
                <span>Выбранные места:</span>
                <strong>{selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(', ') : '—'}</strong>
              </div>
              <div className="detail-row">
                <span>Количество:</span>
                <strong>{selectedSeats.length} билет{selectedSeats.length !== 1 ? 'ов' : ''}</strong>
              </div>
              <div className="detail-row">
                <span>Цена за билет:</span>
                <strong>₸ {TICKET_PRICE.toLocaleString()}</strong>
              </div>
            </div>

            <div className="total-price">
              <span>Итого:</span>
              <strong>₸ {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              className="confirm-btn"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || processing}
            >
              {processing ? 'Обработка...' : 'Подтвердить покупку'}
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Booking
