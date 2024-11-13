// src/components/DarkModeToggle.js
import React, { useState } from "react"

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")

  const toggleDarkMode = () => {
    const theme = darkMode ? "light" : "dark"
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark")
    setDarkMode(!darkMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded bg-primary text-white mt-4">
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default DarkModeToggle
