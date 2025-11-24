import React, {useEffect, useState} from 'react'
import api from '../utils/api'

export default function Home(){
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try{
        const data = await api.get('/films')
        setFilms(data || [])
      }catch(e){
        console.error(e)
      }finally{setLoading(false)}
    }
    load()
  },[])

  return (
    <div className="container page">
      <h1>🎬 Фильмы в прокате</h1>
      {loading ? (<p>Загрузка...</p>) : (
        <div className="grid">
          {films.length===0 && <div>Нет доступных фильмов</div>}
          {films.map(f=> (
            <div key={f.id} className="card film-card">
              <h3>{f.title}</h3>
              {f.rating && <div className="rating">⭐ {f.rating.toFixed(1)}</div>}
              <p><strong>Жанр:</strong> {f.genre}</p>
              <p><strong>Длительность:</strong> {f.duration} мин</p>
              <button className="btn" onClick={()=> window.location.href='/booking'} disabled={!localStorage.getItem('jwtToken')}>Забронировать</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
