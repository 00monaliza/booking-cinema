import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Sessions.css'

function Sessions() {
  const { filmId } = useParams()
  const navigate = useNavigate()
  const [film, setFilm] = useState(null)
  const [sessions, setSessions] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getFilms(),
      api.getSessionsByFilm(filmId)
    ])
      .then(([films, sessionsList]) => {
        const currentFilm = films.find(f => f.id == filmId)
        setFilm(currentFilm)
        setSessions(sessionsList)
        // Set first date as selected
        if (sessionsList.length > 0) {
          const firstDate = sessionsList[0].date || new Date().toISOString().split('T')[0]
          setSelectedDate(firstDate)
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [filmId])

  const filteredSessions = sessions.filter(s => {
    const sessionDate = s.date || new Date().toISOString().split('T')[0]
    return !selectedDate || sessionDate === selectedDate
  })

  const uniqueDates = [...new Set(sessions.map(s => s.date || new Date().toISOString().split('T')[0]))]

  const handleSelectSession = (sessionId) => {
    navigate(`/booking/${sessionId}`)
  }

  if (loading) {
    return (
      <div className="sessions-page">
        <div className="container">
          <div className="loading">Загружаем сеансы...</div>
        </div>
      </div>
    )
  }

  if (!film) {
    return (
      <div className="sessions-page">
        <div className="container">
          <div className="error-message">Фильм не найден</div>
          <button onClick={() => navigate('/')} className="back-btn">← Вернуться</button>
        </div>
      </div>
    )
  }

  return (
    <div className="sessions-page">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-btn">← Вернуться к фильмам</button>
        
        <div className="film-header">
          <div className="film-poster-large">
            <div className="poster-icon-large">🎬</div>
            <div className="rating-large">{film.rating}</div>
          </div>
          <div className="film-details">
            <h1>{film.title}</h1>
            <p className="genre">{film.genre}</p>
            <p className="duration">⏱️ Продолжительность: {film.duration} минут</p>
          </div>
        </div>

        <div className="dates-selector">
          <h2>Выберите дату:</h2>
          <div className="dates-list">
            {uniqueDates.map(date => (
              <button
                key={date}
                className={`date-btn ${selectedDate === date ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {new Date(date + 'T00:00:00').toLocaleDateString('ru-RU', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="sessions-container">
          <h2>📽️ Доступные сеансы:</h2>
          {filteredSessions.length === 0 ? (
            <div className="no-sessions">
              <p>😔 На этот день нет сеансов</p>
            </div>
          ) : (
            <div className="sessions-grid">
              {filteredSessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-time">{session.time}</div>
                  <div className="session-details">
                    <p>Зал {session.hallNumber}</p>
                    <p className="available-seats">
                      Свободных мест: <strong>{session.availableSeats || 50}</strong>
                    </p>
                  </div>
                  <button
                    className="buy-btn"
                    onClick={() => handleSelectSession(session.id)}
                  >
                    Купить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sessions
