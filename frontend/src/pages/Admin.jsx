import React from 'react'

export default function Admin(){
  const role = localStorage.getItem('role')
  if(role !== 'ADMIN') return (<div className="container page"><h2>Доступ запрещён</h2></div>)
  return (
    <div className="container page">
      <h2>Админ панель</h2>
      <p>Управление фильмами и сессиями (заглушка)</p>
    </div>
  )
}
