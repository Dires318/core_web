import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse, LoginCredentials, RegisterCredentials, UpdateProfileData } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post<AuthResponse>('/auth/refresh/');
        const { accessToken } = response.data;
        
        Cookies.set('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login/', credentials);
    const { accessToken, refreshToken } = response.data;
    
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register/', credentials);
    // const { accessToken, refreshToken } = response.data;
    
    // Cookies.set('accessToken', accessToken);
    // Cookies.set('refreshToken', refreshToken);
    
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout/   ');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/user/me/');
    return response.data;
  },

  async updateProfile(data: UpdateProfileData) {
    const response = await api.patch('/auth/user/me/', data);
    return response.data;
  },
};

export default api; 