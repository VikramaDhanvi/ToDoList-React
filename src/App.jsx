// App.jsx
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Weather from './components/Weather'
import Auth from './components/Auth'
import { fetchWeather } from './redux/weatherSlice'

const App = () => {
  const [editIndex, setEditIndex] = useState(null)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWeather())
    }
  }, [isAuthenticated, dispatch])

  return (
    <div className="container">
      <h1>Advanced React To-Do</h1>
      <Auth />
      {isAuthenticated && (
        <>
          <Weather />
          <TaskInput editIndex={editIndex} setEditIndex={setEditIndex} />
          <TaskList setEditIndex={setEditIndex} />
        </>
      )}
    </div>
  )
}

export default App
