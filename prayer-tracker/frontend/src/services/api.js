import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Get today's statistics
export const getTodayStats = async () => {
  try {
    const response = await api.get('/stats/today')
    return response.data
  } catch (error) {
    console.error('Error fetching today stats:', error)
    throw error
  }
}

// Get statistics for a date range
export const getStatsRange = async (startDate, endDate, name = null) => {
  try {
    const params = { startDate, endDate }
    if (name) params.name = name
    
    const response = await api.get('/stats/range', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching stats range:', error)
    throw error
  }
}

// Get monthly statistics
export const getMonthlyStats = async (year, month, name = null) => {
  try {
    const params = { year, month }
    if (name) params.name = name
    
    const response = await api.get('/stats/month', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching monthly stats:', error)
    throw error
  }
}

// Mark prayer as read
export const markAsReadAPI = async (name, date) => {
  try {
    const response = await api.post('/read', { name, date })
    return response.data
  } catch (error) {
    console.error('Error marking as read:', error)
    throw error
  }
}

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Error checking health:', error)
    throw error
  }
}