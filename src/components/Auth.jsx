import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/authSlice'

const Auth = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div>
      <button onClick={() => dispatch(isAuthenticated ? logout() : login())}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}

export default Auth
