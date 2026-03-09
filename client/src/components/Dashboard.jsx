import ProgressChart from './ProgressChart'

export default function Dashboard({ tasks, progress, completed }) {
  const streak = completed >= 3 ? 7 : completed >= 1 ? 2 : 0

  return (
    <section className="dashboard-grid">
      <div className="glass-card stat-card">
        <h3>Today's Progress</h3>
        <p className="big-number">{progress}%</p>
      </div>

      <div className="glass-card stat-card">
        <h3>Completed Tasks</h3>
        <p className="big-number">{completed}/{tasks.length}</p>
      </div>

      <div className="glass-card stat-card">
        <h3>Routine Streak</h3>
        <p className="big-number">{streak} days</p>
      </div>

      <div className="glass-card chart-card">
        <h3>Weekly Progress</h3>
        <ProgressChart progress={progress} />
      </div>
    </section>
  )
}