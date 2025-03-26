import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../redux/weatherSlice'

const Weather = () => {
  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.weather)
  const [selectedOption, setSelectedOption] = useState('auto:ip')
  const [customLocation, setCustomLocation] = useState('')

  useEffect(() => {
    dispatch(fetchWeather(selectedOption))
  }, [selectedOption, dispatch])

  const handleSelectChange = (e) => {
    const value = e.target.value
    if (value !== 'custom') {
      setSelectedOption(value)
      setCustomLocation('')
    }
  }

  const handleCustomSearch = () => {
    if (customLocation.trim()) {
      setSelectedOption(customLocation.trim())
    }
  }

  return (
    <div className="weather">
      <h3>🌦️ Weather Info</h3>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="auto:ip">Auto (My Location)</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Delhi">Delhi</option>
          <option value="Tokyo">Tokyo</option>
          <option value="custom">Other (enter below)</option>
        </select>

        <input
          type="text"
          placeholder="Type a city or country"
          value={customLocation}
          onChange={(e) => setCustomLocation(e.target.value)}
        />
        <button
            className="fancy-btn"
            onClick={handleCustomSearch}
            style={{ transform: 'scale(0.8)', padding: '0', height: '38px' }}
        >
            <span style={{ padding: '5px 10px', fontSize: '0.7rem' }}>Search</span>
        </button>

      </div>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      {data && (
        <div>
          <p><strong>Location:</strong> {data.location.name}, {data.location.country}</p>
          <p><strong>Temperature:</strong> {data.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {data.current.condition.text}</p>
          <img src={data.current.condition.icon} alt="weather-icon" />
        </div>
      )}
    </div>
  )
}

export default Weather
