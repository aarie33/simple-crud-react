import axios from 'axios';
import ApiResponse from './ApiResponse';
import store from '../redux/store';

const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  async register<T>(name: string, email: string, password: string): Promise<ApiResponse<T>> {
    try {
      const response = await axios.post(`${API_URL}/users`, { name, email, password });
      return {
        data: response.data.data,
        error: null
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data.errors
      };
    }
  },

  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.token);
      }

      return {
        data: response.data.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data.errors
      };
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },

  currentUser() {
    return store.getState().user;
  }
};