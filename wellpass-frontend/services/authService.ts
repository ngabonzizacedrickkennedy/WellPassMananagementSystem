import api from '../lib/api';
import { User, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  email: string;
  fullName: string;
  role: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        '/api/auth/login',
        credentials
      );

      const authData = response.data.data;

      localStorage.setItem('accessToken', authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);

      const user: User = {
        id: authData.userId,
        email: authData.email,
        fullName: authData.fullName,
        phoneNumber: '',
        role: authData.role as any,
        isEmailVerified: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(user));

      return {
        user,
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData: RegisterRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        '/api/auth/register',
        userData
      );

      const authData = response.data.data;

      localStorage.setItem('accessToken', authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);

      const user: User = {
        id: authData.userId,
        email: authData.email,
        fullName: authData.fullName,
        phoneNumber: userData.phoneNumber,
        role: authData.role as any,
        isEmailVerified: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(user));

      return {
        user,
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      };
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error('Email already exists. Please use a different email or login.');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Invalid registration data');
      }
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('accessToken');

      if (token) {
        await api.post('/api/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/api/auth/refresh',
      { refreshToken }
    );

    const authData = response.data.data;

    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('refreshToken', authData.refreshToken);

    return {
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    };
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/api/password/forgot', { email });
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Email not found. Please check and try again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  async resetPassword(data: { token: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const response = await api.post<ApiResponse<any>>('/api/password/reset', {
        resetToken: data.token,
        newPassword: data.newPassword
      });
      return { message: response.data.message };
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Invalid or expired reset token');
      }
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};