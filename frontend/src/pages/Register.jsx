import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../utils/api'

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!username || !password || !confirmPassword) {
        throw new Error('Заполните все поля')
      }
      if (username.length < 3) {
        throw new Error('Имя пользователя должно быть не менее 3 символов')
      }
      if (password.length < 8) {
        throw new Error('Пароль должен быть не менее 8 символов')
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error('Пароль должен содержать хотя бы одну ЗАГЛАВНУЮ букву')
      }
      if (!/[a-z]/.test(password)) {
        throw new Error('Пароль должен содержать хотя бы одну строчную букву')
      }
      if (!/[0-9]/.test(password)) {
        throw new Error('Пароль должен содержать хотя бы одну цифру')
      }
      if (password !== confirmPassword) {
        throw new Error('Пароли не совпадают')
      }
      const data = await api.register(username, password)
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || { username, role: 'USER' }))
        onRegisterSuccess(data.user || { username, role: 'USER' })
        navigate('/')
      } else {
        throw new Error('Неверный ответ от сервера')
      }
    } catch (err) {
      console.error('Register error:', err)
      setError(err.message || 'Ошибка при регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="form-card">
        <h1>📝 Регистрация</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Придумайте имя пользователя"
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 8 символов, с буквой и цифрой"
              required
            />
            <small style={{ color: '#999', marginTop: '5px', display: 'block' }}>
              Требования: минимум 8 символов, большая буква, маленькая буква, цифра
            </small>
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              required
            />
          </div>
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Регистрируемся...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="form-link">
          Уже есть аккаунт? <Link to="/login">Войдите</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
