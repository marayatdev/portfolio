import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export function useAxios<T = any>(config: AxiosRequestConfig, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const finalConfig: AxiosRequestConfig = {
          ...config,
          withCredentials: true, // ✅ ใช้ cookie ส่งไปกับ request
        };

        const response: AxiosResponse<T> = await axios(finalConfig);

        if (!cancel) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          setData(null);
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [...dependencies]);

  return { data, error, loading };
}
