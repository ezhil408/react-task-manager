
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as completed`}
        />

        <div className="task-details">
          <h3>{task.title}</h3>

          <div className="task-meta">
            <span className={`priority priority-${task.priority.toLowerCase()}`}>
              {task.priority} priority
            </span>

            {task.dueDate && (
              <span className="due-date">
                Due: {task.dueDate}
              </span>
            )}

            <span className="status">
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEdit(task)}
          disabled={task.completed}
        >
          Edit
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskItem
