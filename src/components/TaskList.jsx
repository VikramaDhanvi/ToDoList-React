// TaskList.jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, completeTask } from '../redux/taskSlice'

const TaskList = ({ setEditIndex }) => {
  const tasks = useSelector(state => state.tasks.tasks)
  const dispatch = useDispatch()

  const getStatusClass = (task) => {
    const now = new Date()
    const deadline = task.dueDate ? new Date(task.dueDate) : null

    if (!task.completed && deadline && now > deadline) return 'overdue'
    if (task.completed && task.completedAt && deadline) {
      const completed = new Date(task.completedAt)
      if (completed <= deadline) return 'completed-on-time'
      else return 'completed-late'
    }
    if (task.completed) return 'completed-on-time'
    return ''
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`task-item ${task.priority.toLowerCase()} ${getStatusClass(task)}`}
        >
          <div>
            <strong>{task.text}</strong>
            {task.dueDate && <div>Due: {new Date(task.dueDate).toLocaleString()}</div>}
          </div>
          <div>
            {!task.completed && (
              <>
                <button onClick={() => dispatch(completeTask(index))}>Complete</button>
                <button onClick={() => setEditIndex(index)}>Edit</button>
              </>
            )}
            <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
