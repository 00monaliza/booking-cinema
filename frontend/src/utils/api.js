const API_BASE_V1 = '/api/v1'
const API_BASE_USERS = '/api/users'

async function request(path, options = {}){
  const headers = options.headers || {}
  headers['Content-Type'] = 'application/json'
  const token = localStorage.getItem('jwtToken')
  if(token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(path, {...options, headers})
  if(res.status === 204) return null
  const json = await res.json().catch(()=>null)
  if(!res.ok) throw new Error(json?.message || 'API error')
  return json
}

export default {
  login: (body) => request(`${API_BASE_USERS}/login`, { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request(`${API_BASE_USERS}/register`, { method: 'POST', body: JSON.stringify(body) }),
  get: (p) => request(`${API_BASE_V1}${p}`, { method: 'GET' }),
  post: (p, body) => request(`${API_BASE_V1}${p}`, { method: 'POST', body: JSON.stringify(body) }),
  put: (p, body) => request(`${API_BASE_V1}${p}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (p) => request(`${API_BASE_V1}${p}`, { method: 'DELETE' })
}
