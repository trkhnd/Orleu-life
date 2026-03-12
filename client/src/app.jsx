import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning workout', time: '07:00', category: 'Health', done: false },
    { id: 2, title: 'Study for 2 hours', time: '10:00', category: 'Study', done: true },
    { id: 3, title: 'Plan tomorrow', time: '21:00', category: 'Planning', done: false }
  ])

  const [note, setNote] = useState('Stay focused and improve every single day.')
  const [page, setPage] = useState('Home')

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...task
      }
    ])
  }

  const toggleTask = (id, done) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !done } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const completed = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="nav-brand">Orleu Life</div>

        <div className="nav-links">
          {['Home', 'Daily Plan', 'Progress', 'Stats'].map((item) => (
            <button
              key={item}
              className={`nav-btn ${page === item ? 'active-nav' : ''}`}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {page === 'Home' && (
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
      )}

      {page === 'Daily Plan' && (
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
      )}

      {page === 'Progress' && (
        <main className="container page-space">
          <section className="glass-card page-header-card">
            <h1>Progress</h1>
            <p>See your productivity and consistency visually.</p>
          </section>

          <Dashboard tasks={tasks} progress={progress} completed={completed} />
        </main>
      )}

      {page === 'Stats' && (
        <main className="container page-space">
          <section className="glass-card page-header-card">
            <h1>Statistics</h1>
            <p>Get a simple overview of your routines.</p>
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
              <p className="big-number">{tasks.length - completed}</p>
            </div>

            <div className="glass-card stat-card large-stat">
              <h3>Success Rate</h3>
              <p className="big-number">{progress}%</p>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}