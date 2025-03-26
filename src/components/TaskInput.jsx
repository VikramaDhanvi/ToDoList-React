// TaskInput.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../redux/taskSlice'

const TaskInput = ({ editIndex, setEditIndex }) => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)

  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (editIndex !== null && tasks[editIndex]) {
      const task = tasks[editIndex]
      setText(task.text)
      setPriority(task.priority)
      setDueDate(task.dueDate || '')
    }
  }, [editIndex, tasks])

  const handleSubmit = () => {
    if (text.trim()) {
      if (editIndex !== null) {
        dispatch(editTask({ index: editIndex, newText: text, newPriority: priority, newDueDate: dueDate }))
        setEditIndex(null)
      } else {
        dispatch(addTask({ text, priority, dueDate }))
      }
      setText('')
      setPriority('Medium')
      setDueDate('')
    }
  }

  return (
    <div className="task-input">
      <input
        type="text"
        value={text}
        placeholder="Task name"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="fancy-btn" onClick={handleSubmit}>
        <span>{editIndex !== null ? 'Update Task' : 'Add Task'}</span>
      </button>

    </div>
  )
}

export default TaskInput
