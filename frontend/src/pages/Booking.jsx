import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Booking(){
  const navigate = useNavigate()
  const [films, setFilms] = useState([])
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    if(!localStorage.getItem('jwtToken')){
      navigate('/login')
      return
    }
    async function load(){
      try{
        const f = await api.get('/films')
        setFilms(f||[])
      }catch(e){ console.error(e) }
    }
    load()
  },[navigate])

  async function selectFilm(filmId){
    setSelectedFilm(filmId)
    setSelectedSession(null)
    setSeats([])
    setSelectedSeats([])
    try{
      const s = await api.get(`/sessions/film/${filmId}`)
      setSessions(s||[])
    }catch(e){ console.error(e) }
  }

  function selectSession(session){
    setSelectedSession(session)
    const totalSeats = session.totalSeats || 20
    setSeats(Array.from({length: totalSeats}, (_, i)=> ({id: i+1, booked: Math.random() < 0.3})))
  }

  function toggleSeat(seatId){
    setSelectedSeats(prev=> 
      prev.includes(seatId) ? prev.filter(s=> s!==seatId) : [...prev, seatId]
    )
  }

  async function confirmBooking(){
    if(!selectedSession || selectedSeats.length===0){
      setError('Выберите сеанс и места')
      return
    }
    setLoading(true)
    setError('')
    try{
      const booking = {
        sessionId: selectedSession.id,
        seats: selectedSeats.join(','),
        status: 'CONFIRMED'
      }
      await api.post('/bookings', booking)
      alert('Бронирование успешно!')
      navigate('/bookings')
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="container page">
      <h2>Бронирование билетов</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="booking-flow">
        <div className="step">
          <h3>Шаг 1: Выберите фильм</h3>
          <div className="grid">
            {films.map(f=> (
              <button
                key={f.id}
                className={`card ${selectedFilm===f.id ? 'selected' : ''}`}
                onClick={()=> selectFilm(f.id)}
              >
                <h4>{f.title}</h4>
                <p>⭐ {f.rating}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedFilm && (
          <div className="step">
            <h3>Шаг 2: Выберите сеанс</h3>
            <div className="grid">
              {sessions.length===0 && <p>Нет доступных сеансов</p>}
              {sessions.map(s=> (
                <button
                  key={s.id}
                  className={`card ${selectedSession?.id===s.id ? 'selected' : ''}`}
                  onClick={()=> selectSession(s)}
                >
                  <h4>{s.startTime}</h4>
                  <p>Зал {s.hall}</p>
                  <p>Свободных мест: {s.availableSeats}/{s.totalSeats}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSession && (
          <div className="step">
            <h3>Шаг 3: Выберите места</h3>
            <div className="seats-grid">
              {seats.map(seat=> (
                <button
                  key={seat.id}
                  className={`seat ${seat.booked ? 'booked' : selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                  onClick={()=> !seat.booked && toggleSeat(seat.id)}
                  disabled={seat.booked}
                >
                  {seat.id}
                </button>
              ))}
            </div>
            <p>Выбрано мест: {selectedSeats.length}</p>
            <button 
              className="btn" 
              onClick={confirmBooking} 
              disabled={loading || selectedSeats.length===0}
            >
              {loading ? 'Подтверждение...' : 'Подтвердить бронирование'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
