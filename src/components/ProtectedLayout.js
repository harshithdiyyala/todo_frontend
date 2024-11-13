// src/components/ProtectedLayout.js
import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Navbar from "./Navbar"

const ProtectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated()) {
    // Redirect to login if the user is not authenticated
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return (
    <div>
      <Navbar />
      <Outlet /> {/* Render the child routes here */}
    </div>
  )
}

export default ProtectedLayout
