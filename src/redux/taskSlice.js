import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
}

const saveToLocal = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false, completedAt: null })
      saveToLocal(state.tasks)
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1)
      saveToLocal(state.tasks)
    },
    editTask: (state, action) => {
      const { index, newText, newPriority, newDueDate } = action.payload
      state.tasks[index].text = newText
      state.tasks[index].priority = newPriority
      state.tasks[index].dueDate = newDueDate
      saveToLocal(state.tasks)
    },
    completeTask: (state, action) => {
      const task = state.tasks[action.payload]
      task.completed = true
      task.completedAt = new Date().toISOString()
      saveToLocal(state.tasks)
    }
  }
})

export const { addTask, deleteTask, editTask, completeTask } = taskSlice.actions
export default taskSlice.reducer
