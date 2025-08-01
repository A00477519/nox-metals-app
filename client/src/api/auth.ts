// src/api/auth.ts
import axios from 'axios';
// import config from '../config/env';


const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'https://nox-metals-api-d136b5c0f2a1.herokuapp.com/api',

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
      console.log(userData.role);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const getUserCount = async () => {
  try {
    const response = await api.get('/auth/users/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching user count:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/auth/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// export default authAPI;