// src/pages/Profile.js
import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { fetchUserProfile, updateUserProfile } from "../services/apis"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [profile, setProfile] = useState({ name: "", email: "" })
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile()
        setProfile(data)
      } catch (error) {
        console.error("Error fetching profile:", error.message)
      }
    }
    loadProfile()
  }, [])

  const handleProfileUpdate = async () => {
    try {
      // Create update payload
      const updateData = { name: profile.name, email: profile.email }
      if (passwords.newPassword) {
        // Validate password match
        if (passwords.newPassword !== passwords.confirmPassword) {
          setMessage("New password and confirmation do not match.")
          return
        }
        // Add current and new passwords to update data
        updateData.currentPassword = passwords.currentPassword
        updateData.newPassword = passwords.newPassword
      }

      await updateUserProfile(updateData)
      setMessage("Profile updated successfully")
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      console.error("Error updating profile:", error.message)
      setMessage("Failed to update profile. Ensure current password is correct.")
    }
  }

  return (
    <div className=" min-h-screen bg-darkBg text-darkText p-8">
      <div className="p-8 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Update Profile</h2>
        {message && <p className="text-green-500">{message}</p>}

        {/* Profile Information */}
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 mb-4 rounded-lg bg-gray-900 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 mb-4 rounded-lg bg-gray-900 text-white"
        />

        <h2 className="text-xl font-bold mt-8 mb-4 text-white">Update Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          className="w-full p-2 mb-4 rounded-lg bg-gray-900 text-white"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          className="w-full p-2 mb-4 rounded-lg bg-gray-900 text-white"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          className="w-full p-2 mb-4 rounded-lg bg-gray-900 text-white"
        />

        <button
          onClick={handleProfileUpdate}
          className="w-full p-2 bg-primary text-white rounded-lg">
          Update Profile
        </button>
      </div>
    </div>
  )
}

export default Profile
