import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/apis"
import { AuthContext } from "../context/AuthContext"
import toDo from "../assets/toDo.png"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login(email, password)
      localStorage.setItem("token", user.token)
      setUser(user)
      navigate("/home")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg text-darkText dark:bg-darkBg">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center items-center gap-1 my-4">
          <img
            src={toDo}
            className="h-12 w-12"
          />
          <h1 className="text-2xl font-semibold text-white">UpNext</h1>
        </div>
        <h2 className="text-md font-medium mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-primary text-white font-bold hover:bg-indigo-700">
          Login
        </button>
        <p className="my-3">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
