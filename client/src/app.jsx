import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API = 'http://localhost:5000/api/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [note, setNote] = useState('Stay focused and improve every single day.')

  const fetchTasks = async () => {
    const res = await axios.get(API)
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (task) => {
    await axios.post(API, task)
    fetchTasks()
  }

  const toggleTask = async (id, done) => {
    await axios.patch(`${API}/${id}`, { done: !done })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchTasks()
  }

  const completed = tasks.filter(task => task.done).length
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div className="app-shell">
      <Header />

      <main className="container">
        <Dashboard tasks={tasks} progress={progress} completed={completed} />

        <section className="grid-section">
          <div className="glass-card">
            <h2>Add Daily Routine</h2>
            <TaskForm onAdd={addTask} />
          </div>

          <div className="glass-card">
            <h2>Daily Reflection</h2>
            <textarea
              className="note-box"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your reflection, thoughts, or tomorrow's plan..."
            />
          </div>
        </section>

        <section className="glass-card">
          <h2>Today's Agenda</h2>
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>
      </main>
    </div>
  )
}