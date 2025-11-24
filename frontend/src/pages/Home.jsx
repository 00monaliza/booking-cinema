import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/Home.css'

function Home() {
  const [films, setFilms] = useState([])
  const [filteredFilms, setFilteredFilms] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.getFilms()
      .then(data => {
        setFilms(data)
        setFilteredFilms(data)
        // Extract unique genres
        const uniqueGenres = [...new Set(data.map(f => f.genre))]
        setGenres(uniqueGenres)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let filtered = films
    
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(f => f.genre === selectedGenre)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredFilms(filtered)
  }, [selectedGenre, searchTerm, films])

  const handleSelectFilm = (filmId) => {
    navigate(`/sessions/${filmId}`)
  }

  if (loading) {
    return (
      <div className="home-page">
        <div className="container">
          <div className="loading">Загружаем фильмы...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>🎬 Кинотеатр Online</h1>
          <p>Выбирайте и бронируйте билеты легко и быстро</p>
        </div>
      </div>

      <div className="container home-container">
        <div className="home-layout">
          {/* Sidebar with filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>🔍 Поиск</h3>
              <input
                type="text"
                placeholder="Название фильма..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <h3>🎭 Жанры</h3>
              <div className="genre-list">
                <button
                  className={`genre-btn ${selectedGenre === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedGenre('all')}
                >
                  Все жанры
                </button>
                {genres.map(genre => (
                  <button
                    key={genre}
                    className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>📊 Результаты</h3>
              <p className="results-count">Найдено фильмов: <strong>{filteredFilms.length}</strong></p>
            </div>
          </aside>

          {/* Main content */}
          <main className="films-section">
            <h2>🎥 Доступные фильмы</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {filteredFilms.length === 0 ? (
              <div className="no-films">
                <p>😔 Фильмы не найдены</p>
              </div>
            ) : (
              <div className="films-grid">
                {filteredFilms.map(film => (
                  <div key={film.id} className="film-card">
                    <div className="film-poster">
                      <div className="poster-icon">🎬</div>
                      <div className="rating-badge">{film.rating}</div>
                    </div>
                    <div className="film-info">
                      <h3>{film.title}</h3>
                      <p className="genre">{film.genre}</p>
                      <p className="duration">⏱️ {film.duration} мин</p>
                      <button className="select-btn" onClick={() => handleSelectFilm(film.id)}>
                        Купить билет →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home
