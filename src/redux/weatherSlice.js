import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Use environment variable from .env
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (location = 'auto:ip', { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`)
  
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.error.message || 'Failed to fetch weather')
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Unknown error occurred')
    }
  })
  

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch weather'
      })
  }
})

export default weatherSlice.reducer
