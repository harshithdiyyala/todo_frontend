// src/App.js
import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./pages/Home"
import Profile from "./components/Profile"
import ProtectedLayout from "./components/ProtectedLayout" // Import the layout component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Protected Layout for Authenticated Routes */}
          <Route element={<ProtectedLayout />}>
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          {/* Redirect root path to login */}
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
