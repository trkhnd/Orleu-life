import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('Study')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      time: time.trim() || 'Any time',
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
        placeholder="Time (e.g. 07:00)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
        <option value="Work">Work</option>
        <option value="Planning">Planning</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  )
}