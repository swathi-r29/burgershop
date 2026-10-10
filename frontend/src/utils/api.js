import axios from 'axios'
import { useStore } from '../store/useStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

api.interceptors.request.use((config) => {
  const token = useStore.getState().adminToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const menuAPI = {
  getAll: () => api.get('/menu'),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
  toggleAvailability: (id) => api.patch(`/menu/${id}/availability`),
}

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
}

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
}

export const analyticsAPI = {
  getSummary: () => api.get('/analytics/summary'),
}

export const uploadAPI = {
  upload: (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

export default api
