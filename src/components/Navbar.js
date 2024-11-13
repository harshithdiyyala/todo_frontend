// src/components/Navbar.js
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toDo from "../assets/toDo.png"
const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login") // Redirect to login after logout
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      <div className="flex justify-center items-center gap-1">
        <img
          src={toDo}
          className="h-12 w-12"
        />
        <h1 className="text-2xl font-semibold text-white">UpNext</h1>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/home"
          className="text-white hover:text-primary">
          Home
        </Link>
        <Link
          to="/profile"
          className="text-white hover:text-primary">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-500">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
