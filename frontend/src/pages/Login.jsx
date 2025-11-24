import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../utils/api'

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!username || !password) {
        throw new Error('Введите имя пользователя и пароль')
      }
      const data = await api.login(username, password)
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || { username, role: 'USER' }))
        onLoginSuccess(data.user || { username, role: 'USER' })
        navigate('/')
      } else {
        throw new Error('Неверный ответ от сервера')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Ошибка при входе')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="form-card">
        <h1>🎬 Вход</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>
        <div className="form-link">
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
