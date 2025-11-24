import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Bookings(){
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!localStorage.getItem('jwtToken')){
      navigate('/login')
      return
    }
    async function load(){
      // В реальности нужен отдельный endpoint для получения бронирований пользователя
      // Пока показываем заглушку
      setBookings([])
      setLoading(false)
    }
    load()
  },[navigate])

  return (
    <div className="container page">
      <h2>Мои бронирования</h2>
      {loading ? (<p>Загрузка...</p>) : bookings.length===0 ? (
        <p>У вас нет бронирований</p>
      ) : (
        <div className="grid">
          {bookings.map(b=> (
            <div key={b.id} className="card">
              <h3>Фильм: {b.filmTitle}</h3>
              <p>Дата: {b.date}</p>
              <p>Места: {b.seats}</p>
              <p>Статус: {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
