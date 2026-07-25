import axios from 'axios';

// Instancia global de Axios
export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});
