'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { User, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    const loginPromise = authService.login(credentials);
    
    toast.promise(
      loginPromise,
      {
        loading: 'Signing in...',
        success: (response) => {
          setUser(response.user);
          setTimeout(() => router.push('/dashboard'), 500);
          return `Welcome back, ${response.user.fullName}!`;
        },
        error: (err) => {
          return err.response?.data?.message || 'Invalid email or password';
        },
      },
      {
        success: {
          duration: 3000,
          icon: '✅',
        },
        error: {
          duration: 4000,
          icon: '❌',
        },
      }
    );

    await loginPromise;
  };

  const register = async (data: RegisterRequest) => {
    const registerPromise = authService.register(data);
    
    toast.promise(
      registerPromise,
      {
        loading: 'Creating your account...',
        success: (response) => {
          setUser(response.user);
          setTimeout(() => router.push('/login'), 500);
          return 'Account created successfully! Please login.';
        },
        error: (err) => {
          return err.response?.data?.message || 'Registration failed. Please try again.';
        },
      },
      {
        success: {
          duration: 3000,
          icon: '🎉',
        },
        error: {
          duration: 4000,
          icon: '❌',
        },
      }
    );

    await registerPromise;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully', {
        icon: '👋',
        duration: 2000,
      });
      router.push('/login');
    } catch (error) {
      setUser(null);
      router.push('/login');
    }
  };

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};