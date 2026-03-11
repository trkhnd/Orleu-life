export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="task-list">
        <div className="task-item">
          <div>
            <h3>No tasks yet</h3>
            <p>Add your first routine item and start building your day.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className={`task-item ${task.done ? 'done' : ''}`} key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.time} • {task.category}</p>
          </div>

          <div className="task-actions">
            <button type="button" onClick={() => onToggle(task.id, task.done)}>
              {task.done ? 'Undo' : 'Done'}
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}