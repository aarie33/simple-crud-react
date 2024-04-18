import axios from 'axios';
import ApiResponse from './ApiResponse';
import store from '../redux/store';
import { authService } from './AuthService';

const API_URL = process.env.REACT_APP_API_URL;

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Paging {
  current_page: number;
  total_page: number;
  total_items: number;
}

export const postService = {
  async create<T>(title: string, content: string, published: boolean): Promise<ApiResponse<T>> {
    const token = authService.currentUser()?.token;

    try {
      const response = await axios.post(`${API_URL}/posts`, { title, content, published }, {
        headers: {
          Authorization: `${token}`
        }
      });
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

  async getAll<T>(page: number, size: number, search?: string): Promise<ApiResponse<T>> {
    const token = authService.currentUser()?.token;

    try {
      const response = await axios.get(`${API_URL}/posts`, {
        params: { search, page, size },
        headers: {
          Authorization: `${token}`
        }
      });

      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data.errors
      };
    }
  },

  async getById<T>(id: number): Promise<ApiResponse<T>> {
    const token = authService.currentUser()?.token;

    try {
      const response = await axios.get(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      });

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

  async update<T>(id: number, title: string, content: string, published: boolean): Promise<ApiResponse<T>> {
    const token = authService.currentUser()?.token;

    try {
      const response = await axios.put(`${API_URL}/posts/${id}`, {
        id, title, content, published
      }, {
        headers: {
          Authorization: `${token}`
        }
      });

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

  async delete<T>(id: number): Promise<ApiResponse<T>> {
    const token = authService.currentUser()?.token;

    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      });

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
}