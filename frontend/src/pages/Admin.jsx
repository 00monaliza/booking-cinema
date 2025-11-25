import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Admin.css'

function Admin({ user }) {
  const navigate = useNavigate()
  const [films, setFilms] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: ''
  })

  useEffect(() => {
    loadFilms()
  }, [])

  const loadFilms = async () => {
    try {
      const response = await fetch('/api/v1/films')
      const data = await response.json()
      setFilms(data)
    } catch (error) {
      console.error('Error loading films:', error)
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="page container">
        <div className="error">Access denied. Admin only.</div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddFilm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/v1/films', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: formData.title,
          genre: formData.genre,
          duration: parseInt(formData.duration)
        })
      })

      if (response.ok) {
        setMessage('✅ Фильм успешно добавлен!')
        setFormData({ title: '', genre: '', duration: '' })
        setShowForm(false)
        loadFilms()
      } else if (response.status === 403) {
        setMessage('❌ Недостаточно прав для добавления фильма')
      } else {
        setMessage('❌ Ошибка при добавлении фильма')
      }
    } catch (error) {
      setMessage('❌ Ошибка сервера: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFilm = async (filmId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      return
    }

    try {
      const response = await fetch(`/api/v1/films/${filmId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        setMessage('✅ Фильм удален!')
        loadFilms()
      } else {
        setMessage('❌ Ошибка при удалении фильма')
      }
    } catch (error) {
      setMessage('❌ Ошибка: ' + error.message)
    }
  }

  return (
    <div className="page container">
      <h1>👨‍💼 Admin Panel</h1>
      
      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

      <div className="admin-section">
        <div className="section-header">
          <h2>🎬 Управление фильмами</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Отмена' : '➕ Добавить фильм'}
          </button>
        </div>

        {showForm && (
          <div className="card form-card">
            <h3>Добавить новый фильм</h3>
            <form onSubmit={handleAddFilm}>
              <div className="form-group">
                <label htmlFor="title">Название фильма:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Введите название"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Жанр:</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  placeholder="Введите жанр (например: Драма, Комедия)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Длительность (минуты):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Например: 120"
                  min="1"
                  max="300"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Добавление...' : 'Добавить фильм'}
              </button>
            </form>
          </div>
        )}

        <div className="films-list">
          <h3>Список фильмов ({films.length})</h3>
          {films.length === 0 ? (
            <p>Нет фильмов в системе</p>
          ) : (
            <div className="films-grid">
              {films.map(film => (
                <div key={film.id} className="film-card">
                  <h4>{film.title}</h4>
                  <p><strong>Жанр:</strong> {film.genre}</p>
                  <p><strong>Длительность:</strong> {film.duration} мин</p>
                  <p><strong>Рейтинг:</strong> {film.rating ? film.rating.toFixed(1) : 'N/A'} ⭐</p>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteFilm(film.id)}
                  >
                    🗑️ Удалить
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

export default Admin
