// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import { UpdateUserFormData } from '@/components/auth/UpdateUserForm';

interface User {
  _id: string;
  name: string;
  email: string;
  role: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  updateUser: (data: UpdateUserFormData) => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/me', { withCredentials: true });

      if (res.data.data) {
        console.log(res.data.data);
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setUser(res.data.data);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await api.post('/auth/login', { email, password }, { withCredentials: true });
      await checkAuth();
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const registerUser = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      const response = await api.post(
        '/auth/register',
        { email, password, name },
        { withCredentials: true }
      );

      console.log('register response', response.data);

      if (response.data && response.data.success) {
        await checkAuth();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Registration failed:', err);
      return false;
    }
  };

  const logout = async () => {
    console.log('logout');
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const updateUser = async (data: UpdateUserFormData): Promise<boolean> => {
    try {
      const response = await api.put(`/users/${user?._id}`, data, { withCredentials: true });
      console.log('updateUser response', response.data);

      if (response.data && response.data.success) {
        await checkAuth();
        return true;
      }
      return false;
    } catch (err) {
      console.error('User update failed:', err);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register: registerUser,
        checkAuth,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};