import { useState, useEffect } from 'react'
import { api } from '../utils/api'

function Home() {
  const [films, setFilms] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getFilms()
      .then(setFilms)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container"><p>Loading films...</p></div>
  if (error) return <div className="container error">Error: {error}</div>

  return (
    <div className="page container">
      <h1>🎬 Available Films</h1>
      {films.length === 0 ? (
        <p>No films available</p>
      ) : (
        <div className="grid">
          {films.map(film => (
            <div key={film.id} className="card">
              <h3>{film.title}</h3>
              <p><strong>Genre:</strong> {film.genre}</p>
              <p><strong>Duration:</strong> {film.duration} min</p>
              <div className="rating">⭐ {film.rating}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
