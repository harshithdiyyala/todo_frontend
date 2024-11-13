const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")

  // Only include the Authorization header if a token exists
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  return response.json()
}

export const login = async (email, password) => {
  return await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export const signup = async (name, email, password) => {
  return await request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export const fetchTodos = async () => {
  return await request("/todos", { method: "GET" })
}

export const createTodo = async (title, description, status) => {
  return await request("/todos", {
    method: "POST",
    body: JSON.stringify({ title, description, status }),
  })
}

export const updateTodo = async (id, updates) => {
  return await request(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  })
}

export const deleteTodo = async (id) => {
  return await request(`/todos/${id}`, { method: "DELETE" })
}

export const fetchUserProfile = async () => {
  return await request("/users/profile", { method: "GET" })
}

export const updateUserProfile = async (profileData) => {
  return await request("/users/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  })
}
