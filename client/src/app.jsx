import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API = 'http://localhost:5001/api/tasks'

function Navbar({ currentPage, setCurrentPage }) {
  const items = ['Home', 'Daily Plan', 'Progress', 'Stats']

  return (
    <nav className="navbar">
      <div className="nav-brand">Orleu Life</div>

      <div className="nav-links">
        {items.map((item) => (
          <button
            key={item}
            className={`nav-btn ${currentPage === item ? 'active-nav' : ''}`}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  )
}

function HeatmapCard() {
  const cells = Array.from({ length: 84 }, (_, i) => {
    const level = [0, 1, 2, 3][Math.floor(Math.random() * 4)]
    return { id: i, level }
  })

  return (
    <section className="glass-card heatmap-card">
      <div className="heatmap-top">
        <h2>Consistency Activity</h2>
        <p>Track how active and disciplined you have been over time.</p>
      </div>

      <div className="heatmap-grid">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`heat-cell level-${cell.level}`}
            title={`Activity level ${cell.level}`}
          />
        ))}
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <h3>92 tasks</h3>
          <p>completed overall</p>
        </div>

        <div className="mini-stat">
          <h3>14 days</h3>
          <p>best streak</p>
        </div>

        <div className="mini-stat">
          <h3>6 tasks</h3>
          <p>completed this month</p>
        </div>

        <div className="mini-stat">
          <h3>3 days</h3>
          <p>current streak</p>
        </div>
      </div>
    </section>
  )
}

function HomePage({ tasks, progress, completed, note, setNote, addTask, toggleTask, deleteTask }) {
  return (
    <>
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
    </>
  )
}

function DailyPlanPage({ tasks, addTask, toggleTask, deleteTask }) {
  return (
    <main className="container page-space">
      <section className="glass-card page-header-card">
        <h1>Daily Plan</h1>
        <p>Plan your day clearly and focus on what matters most.</p>
      </section>

      <section className="grid-section">
        <div className="glass-card">
          <h2>Create a New Task</h2>
          <TaskForm onAdd={addTask} />
        </div>

        <div className="glass-card">
          <h2>Focus Tips</h2>
          <div className="tips-box">
            <p>• Start with the hardest task first.</p>
            <p>• Keep your plan realistic and clear.</p>
            <p>• Complete small tasks quickly to build momentum.</p>
            <p>• Review your day every evening.</p>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <h2>Planned Tasks</h2>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </section>
    </main>
  )
}

function ProgressPage({ tasks, progress, completed }) {
  return (
    <main className="container page-space">
      <section className="glass-card page-header-card">
        <h1>Progress</h1>
        <p>See your productivity, consistency, and growth visually.</p>
      </section>

      <Dashboard tasks={tasks} progress={progress} completed={completed} />
      <HeatmapCard />
    </main>
  )
}

function StatsPage({ tasks, completed, progress }) {
  const pending = tasks.length - completed

  return (
    <main className="container page-space">
      <section className="glass-card page-header-card">
        <h1>Statistics</h1>
        <p>Get a simple overview of how your routines are going.</p>
      </section>

      <section className="stats-grid">
        <div className="glass-card stat-card large-stat">
          <h3>Total Tasks</h3>
          <p className="big-number">{tasks.length}</p>
        </div>

        <div className="glass-card stat-card large-stat">
          <h3>Completed</h3>
          <p className="big-number">{completed}</p>
        </div>

        <div className="glass-card stat-card large-stat">
          <h3>Pending</h3>
          <p className="big-number">{pending}</p>
        </div>

        <div className="glass-card stat-card large-stat">
          <h3>Success Rate</h3>
          <p className="big-number">{progress}%</p>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [note, setNote] = useState('Stay focused and improve every single day.')
  const [currentPage, setCurrentPage] = useState('Home')

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API)
      setTasks(res.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (task) => {
    try {
      await axios.post(API, task)
      fetchTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const toggleTask = async (id, done) => {
    try {
      await axios.patch(`${API}/${id}`, { done: !done })
      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`)
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const completed = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'Home' && (
        <HomePage
          tasks={tasks}
          progress={progress}
          completed={completed}
          note={note}
          setNote={setNote}
          addTask={addTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      )}

      {currentPage === 'Daily Plan' && (
        <DailyPlanPage
          tasks={tasks}
          addTask={addTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      )}

      {currentPage === 'Progress' && (
        <ProgressPage tasks={tasks} progress={progress} completed={completed} />
      )}

      {currentPage === 'Stats' && (
        <StatsPage tasks={tasks} completed={completed} progress={progress} />
      )}
    </div>
  )
}