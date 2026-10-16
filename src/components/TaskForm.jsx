
import { useEffect, useState } from 'react'

function TaskForm({ onAddTask, taskToEdit, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setPriority(taskToEdit.priority)
      setDueDate(taskToEdit.dueDate || '')
    } else {
      setTitle('')
      setPriority('Medium')
      setDueDate('')
    }
  }, [taskToEdit])

  const handleSubmit = event => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    const taskData = {
      title: title.trim(),
      priority,
      dueDate,
    }

    if (taskToEdit) {
      onUpdateTask({
        ...taskToEdit,
        ...taskData,
      })
    } else {
      onAddTask(taskData)
    }

    setTitle('')
    setPriority('Medium')
    setDueDate('')
  }

  const handleCancel = () => {
    setTitle('')
    setPriority('Medium')
    setDueDate('')
    onCancelEdit()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task name</label>

      <input
        id="task-title"
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={event => setTitle(event.target.value)}
        maxLength={120}
        required
      />

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={event => setPriority(event.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="due-date">Due date</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {taskToEdit ? 'Save Changes' : 'Add Task'}
        </button>

        {taskToEdit && (
          <button
            className="secondary-button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
