import axios from 'axios';
import ApiResponse from './ApiResponse';

const API_URL = process.env.REACT_APP_API_URL;

export interface Comment {
  id: number;
  content: string;
  post_id: number;
  created_at: string;
  updated_at: string;
}

export const commentService = {
  async create<T>(post_id: number, content: string): Promise<ApiResponse<T>> {
    try {
      const response = await axios.post(`${API_URL}/comments`, { content, post_id });

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

  async getAll<T>(post_id: number, page: number, size: number, search?: string): Promise<ApiResponse<T>> {
    try {
      const response = await axios.get(`${API_URL}/comments`, {
        params: { post_id, search, page, size },
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

  async getById<T>(id: number): Promise<ApiResponse<T>> {
    try {
      const response = await axios.get(`${API_URL}/comments/${id}`);

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

  async update<T>(id: number, content: string): Promise<ApiResponse<T>> {
    try {
      const response = await axios.put(`${API_URL}/comments/${id}`, {
        content
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
    try {
      const response = await axios.delete(`${API_URL}/comments/${id}`);

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