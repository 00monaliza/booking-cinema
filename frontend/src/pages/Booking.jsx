import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

function Booking({ user }) {
  const [step, setStep] = useState(1)
  const [films, setFilms] = useState([])
  const [sessions, setSessions] = useState([])
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    api.getFilms()
      .then(setFilms)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [user, navigate])

  const handleSelectFilm = async (filmId) => {
    setSelectedFilm(filmId)
    try {
      const sessions = await api.getSessionsByFilm(filmId)
      setSessions(sessions)
      setStep(2)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSelectSession = (sessionId) => {
    setSelectedSession(sessionId)
    setSelectedSeats([])
    setStep(3)
  }

  const toggleSeat = (seatNum) => {
    setSelectedSeats(prev =>
      prev.includes(seatNum) ? prev.filter(s => s !== seatNum) : [...prev, seatNum]
    )
  }

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat')
      return
    }
    try {
      await api.bookSeats(selectedSession, selectedSeats)
      navigate('/bookings')
    } catch (err) {
      setError(err.message)
    }
  }

  if (!user) return null
  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="page container">
      <h1>🎫 Book Your Tickets</h1>
      {error && <div className="error">{error}</div>}

      {step === 1 && (
        <div className="step">
          <h3>Step 1: Select Film</h3>
          <div className="grid">
            {films.map(film => (
              <div key={film.id} className="card" onClick={() => handleSelectFilm(film.id)} style={{ cursor: 'pointer' }}>
                <h3>{film.title}</h3>
                <p>{film.genre}</p>
                <p>⭐ {film.rating}</p>
                <button className="btn">Select</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h3>Step 2: Select Session</h3>
          <button className="btn" onClick={() => setStep(1)}>Back</button>
          <div style={{ marginTop: '20px' }}>
            {sessions.map(session => (
              <div key={session.id} className="card" onClick={() => handleSelectSession(session.id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                <h3>Hall {session.hallNumber}</h3>
                <p>Time: {session.time}</p>
                <p>Available seats: {session.availableSeats}</p>
                <button className="btn">Select</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h3>Step 3: Select Seats</h3>
          <button className="btn" onClick={() => setStep(2)}>Back</button>
          <p style={{ marginTop: '20px' }}>Selected: {selectedSeats.join(', ') || 'None'}</p>
          <div className="seats-grid">
            {Array.from({ length: 50 }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                className={`seat ${selectedSeats.includes(num) ? 'selected' : ''}`}
                onClick={() => toggleSeat(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="btn" onClick={handleConfirmBooking} style={{ marginTop: '20px' }}>
            Confirm Booking ({selectedSeats.length} seats)
          </button>
        </div>
      )}
    </div>
  )
}

export default Booking
