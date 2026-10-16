
import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

const STORAGE_KEY = 'react-task-manager-tasks'

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : []

    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('All')
  const [taskToEdit, setTaskToEdit] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = taskData => {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
    }

    setTasks(currentTasks => [newTask, ...currentTasks])
  }

  const updateTask = updatedTask => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )

    setTaskToEdit(null)
  }

  const toggleTask = taskId => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = taskId => {
    setTasks(currentTasks =>
      currentTasks.filter(task => task.id !== taskId)
    )

    if (taskToEdit?.id === taskId) {
      setTaskToEdit(null)
    }
  }

  const startEditing = task => {
    setTaskToEdit(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') {
      return !task.completed
    }

    if (filter === 'Completed') {
      return task.completed
    }

    return true
  })

  const completedCount = tasks.filter(task => task.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <p className="eyebrow">STAY ORGANIZED</p>
          <h1>Task Manager</h1>
          <p className="header-description">
            Plan your day. Complete your goals.
          </p>
        </div>

        <div className="total-badge">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <section className="content-card">
        <h2>{taskToEdit ? 'Edit Task' : 'Create a Task'}</h2>

        <TaskForm
          onAddTask={addTask}
          taskToEdit={taskToEdit}
          onUpdateTask={updateTask}
          onCancelEdit={() => setTaskToEdit(null)}
        />
      </section>

      <section className="tasks-section">
        <div className="section-heading">
          <div>
            <h2>Your Tasks</h2>
            <p>Manage your daily activities</p>
          </div>

          <div className="filter-buttons">
            {['All', 'Pending', 'Completed'].map(option => (
              <button
                key={option}
                type="button"
                className={`filter-button ${filter === option ? 'active' : ''}`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={startEditing}
          onDelete={deleteTask}
        />
      </section>

      <footer className="app-footer">
        Built with React JS and Vite
      </footer>
    </main>
  )
}

export default App
