import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('Study')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title,
      time,
      category,
      done: false
    })

    setTitle('')
    setTime('')
    setCategory('Study')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Study</option>
        <option>Health</option>
        <option>Work</option>
        <option>Planning</option>
        <option>Personal</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  )
}