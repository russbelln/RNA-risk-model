import axios from 'axios';

// Configura la URL base de tu backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

export default api;
