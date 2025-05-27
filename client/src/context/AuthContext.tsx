// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';

interface User {
  id: string;
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
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // เรียกตอนโหลดหน้าเว็บ
  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/me', { withCredentials: true });

      if (res.data.data) {
        console.log(res.data.data);
        //set data to localstorage
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setUser(res.data.data);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // login จะตั้ง cookie อัตโนมัติถ้า server ทำถูก
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await api.post('/auth/login', { email, password }, { withCredentials: true });
      await checkAuth();
      return true;
    } catch (err) {
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
      console.log('register response', response.data.success);
      if (
        response.data &&
        (response.data.success || response.status === 200 || response.status === 201)
      ) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Registration failed', err);
      return false;
    }
  };

  const logout = async () => {
    console.log('logout');

    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    checkAuth(); // เรียกตอน mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register: registerUser, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
