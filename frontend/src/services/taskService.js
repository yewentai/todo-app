import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default {
  getTasks: () => axios.get(`${API_URL}/tasks`),
  addTask: (title) => axios.post(`${API_URL}/tasks`, { title }),
  updateTask: (id, data) => axios.put(`${API_URL}/tasks/${id}`, data),
  deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`)
};