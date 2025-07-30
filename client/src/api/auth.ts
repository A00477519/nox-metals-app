// src/api/auth.ts
import axios from 'axios';
// import config from '../config/env';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default {
  // async login(email: string, password: string) {
  //   const response = await api.post('/auth/login', { email, password });
  //   return response.data;
  // },
  // async register(email: string, password: string) {
  //   const response = await api.post('/auth/register', { email, password });
  //   return response.data;
  // },
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },

  async register(email: string, password: string, userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
    phone: string;
    role: string;
}) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// export default authAPI;