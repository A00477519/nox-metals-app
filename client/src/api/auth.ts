// src/api/auth.ts
import axios from 'axios';
import config from '../config/env';

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

export default {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  async register(email: string, password: string) {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};