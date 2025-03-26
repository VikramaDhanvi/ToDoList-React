import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/authSlice'

const Auth = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const handleAuth = () => {
    dispatch(isAuthenticated ? logout() : login())
  }

  return (
    <div className="auth" style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <button className="login-button" onClick={handleAuth}>
        <div><span>{isAuthenticated ? 'Logout' : 'Login'}</span></div>
      </button>
    </div>
  )
}

export default Auth
