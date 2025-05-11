// libs/axios.ts
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// สร้าง axios instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // ส่ง cookie ไปด้วยทุกครั้ง
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ถ้าเกิด 401 และยังไม่ได้ retry
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ถ้า refresh token กำลังทำงานอยู่
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // เรียกใช้ API /auth/refresh เพื่อ refresh token
        const response = await api.post('/auth/refresh');
        const newAccessToken = response.data.data.accessToken;

        // ตั้งค่า Authorization headers ใหม่กับ access token ที่ได้รับมา
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return api(originalRequest); // Retry การ request เดิม
      } catch (refreshError) {
        processQueue(refreshError, null);

        // หาก refresh token ใช้ไม่ได้หรือหมดอายุ
        const { logout } = useAuth();
        logout(); // Logout อัตโนมัติ

        // กรณีเกิด error ไม่สามารถ refresh token ได้
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
