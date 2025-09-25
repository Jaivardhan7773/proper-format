import axios from 'axios';
import {useAuthStore} from "../store/auth/useAuthStore.js"

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
})


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // only handle 401s and prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ✅ FIX: use plain axios, NOT axiosInstance, to avoid hitting interceptor again
        await axios.post(`${baseURL}/api/refresh`, {}, { withCredentials: true });

        // retry the original request now that access token is refreshed
        return axiosInstance(originalRequest);
      } catch (err) {
        // refresh failed → logout user
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
