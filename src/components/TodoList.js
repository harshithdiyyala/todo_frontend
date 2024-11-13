import React, { useEffect, useState } from "react"
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/apis"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({ title: "", description: "", status: "" })
  const [isUpdating, setIsUpdating] = useState(null) // Track the todo being updated
  const options = ["done", "pending", "in progress", "completed"]

  // Fetch todos when the component mounts or after adding/updating a todo
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos()
        setTodos(data)
      } catch (error) {
        console.error("Error fetching todos:", error.message)
      }
    }
    loadTodos()
  }, [isUpdating]) // Re-fetch todos whenever an item is updated or added

  // Handle adding or updating a todo
  const handleAddOrUpdateTodo = async (e) => {
    e.preventDefault()
    try {
      if (isUpdating) {
        // Update existing todo
        const updatedTodo = await updateTodo(isUpdating, newTodo)
        setTodos(todos.map((todo) => (todo._id === isUpdating ? updatedTodo : todo)))
        setIsUpdating(null)
      } else {
        // Add a new todo
        const todo = await createTodo(newTodo.title, newTodo.description, newTodo.status)
        setTodos([...todos, todo])
      }
      setNewTodo({ title: "", description: "", status: "" })
    } catch (error) {
      console.error("Error adding/updating todo:", error.message)
    }
  }

  // Load selected todo data into the form for editing
  const handleEditTodo = (todo) => {
    setNewTodo({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    })
    setIsUpdating(todo._id) // Set the todo being updated
  }

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error.message)
    }
  }

  return (
    <div className="flex p-4 space-x-6">
      {/* Todo List */}
      <div className="w-1/2 bg-gray-800 p-4 rounded-lg max-h-[80vh]">
        <h2 className="text-md font-medium mb-4 text-white">Your action items</h2>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-bold text-white">{todo.title}</h3>
                <p className="text-gray-400">{todo.description}</p>
                <p className="text-sm text-gray-500">Status: {todo.status}</p>
                <p className="text-sm text-gray-500">Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
                {isUpdating === todo._id && <p className="text-yellow-500 font-semibold">Updating action</p>}
              </div>
              <div>
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="mr-2 text-sm p-2 bg-indigo-600 text-white rounded-lg">
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-sm p-2 bg-red-600 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Todo Form */}
      <div className="w-1/2 p-4 bg-gray-900 rounded-lg shadow-md h-auto">
        <h2 className="text-md font-medium mb-4 text-white">{isUpdating ? "Update Todo" : "Add New Todo"}</h2>
        <form
          onSubmit={handleAddOrUpdateTodo}
          className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
          <select
            value={newTodo.status}
            onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
            className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary">
            <option
              value=""
              disabled>
              Select Status
            </option>
            {options.map((opt) => (
              <option
                value={opt}
                key={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-auto p-2 bg-primary text-white rounded-lg">
            {isUpdating ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TodoList
