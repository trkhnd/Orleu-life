export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p>No tasks yet. Add your first routine item.</p>
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className={`task-item ${task.done ? 'done' : ''}`} key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.time} • {task.category}</p>
          </div>

          <div className="task-actions">
            <button onClick={() => onToggle(task.id, task.done)}>
              {task.done ? 'Undo' : 'Done'}
            </button>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}