import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('auth')) || false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
      localStorage.setItem('auth', true)
    },
    logout: (state) => {
      state.isAuthenticated = false
      localStorage.setItem('auth', false)
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
