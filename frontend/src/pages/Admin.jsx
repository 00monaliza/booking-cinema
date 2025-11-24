import { useNavigate } from 'react-router-dom'

function Admin({ user }) {
  const navigate = useNavigate()

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="page container">
        <div className="error">Access denied. Admin only.</div>
      </div>
    )
  }

  return (
    <div className="page container">
      <h1>👨‍💼 Admin Panel</h1>
      <div className="card">
        <h2>Dashboard</h2>
        <p>Admin features coming soon...</p>
        <ul>
          <li>📊 View statistics</li>
          <li>🎬 Manage films</li>
          <li>🎭 Manage sessions</li>
          <li>📋 View all bookings</li>
        </ul>
      </div>
    </div>
  )
}

export default Admin
