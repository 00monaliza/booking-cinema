import React, {useState} from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await api.login({ username, password })
      if(res && res.token){
        localStorage.setItem('jwtToken', res.token)
        localStorage.setItem('username', res.username || username)
        localStorage.setItem('role', res.role || 'USER')
        navigate('/')
      }else{
        setError('Не удалось войти')
      }
    }catch(err){
      setError(err.message || 'Ошибка входа')
    }
  }

  return (
    <div className="container page form-page">
      <h2>Вход</h2>
      <form onSubmit={submit} className="card">
        {error && <div className="error">{error}</div>}
        <label>Имя пользователя
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
        </label>
        <label>Пароль
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn">Войти</button>
      </form>
    </div>
  )
}
