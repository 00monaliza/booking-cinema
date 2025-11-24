import React, {useState} from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    setSuccess('')
    if(password !== confirmPassword){ setError('Пароли не совпадают'); return }
    try{
      await api.register({ username, password })
      setSuccess('Регистрация успешна. Войдите.')
      setTimeout(()=> navigate('/login'), 1000)
    }catch(err){ setError(err.message || 'Ошибка регистрации') }
  }

  return (
    <div className="container page form-page">
      <h2>Регистрация</h2>
      <form onSubmit={submit} className="card">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <label>Имя пользователя
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
        </label>
        <label>Пароль
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <label>Подтвердите пароль
          <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn">Зарегистрироваться</button>
      </form>
    </div>
  )
}
