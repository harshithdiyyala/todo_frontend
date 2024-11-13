import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import TodoList from "../components/TodoList"
import { AuthContext } from "../context/AuthContext"

const Home = () => {
  const { logout, user } = useContext(AuthContext) // Access logout function from context
  const navigate = useNavigate()

  const handleLogout = () => {
    logout() // Clear the user session
    navigate("/login") // Redirect to login page
  }

  return (
    <div className="min-h-screen bg-darkBg text-darkText p-8">
      {/* Navbar */}

      {/* Todo List Component */}
      <h2 className="text-xl">Hello! {user.name}</h2>
      <TodoList />
    </div>
  )
}

export default Home
