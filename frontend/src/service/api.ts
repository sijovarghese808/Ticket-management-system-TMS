// src/services/api.ts
import axios from 'axios';

// Base instance
const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: GET request
export const getHello = () => API.get('/hello');

// Example: POST login
export const login = (username: string, password: string) =>
  API.post('/login', { username, password });
export const createProfile = (name : string, username: string, password: string, confirmPassword : string) =>
  API.post('/create', { name, username, password, confirmPassword });

export default API;
