import React, { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode(token)
      setUser(decoded)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }
  const isAuthenticated = () => !!localStorage.getItem("token") // Returns true if token exists

  return <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}
