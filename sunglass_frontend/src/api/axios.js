// api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Variable to track if token is being refreshed
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If token refresh is in progress, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem('refresh');
      
      if (!refreshToken) {
        // No refresh token, redirect to login
        handleLogout();
        return Promise.reject(error);
      }

      console.log('🔄 Attempting to refresh token...');
      
      // Call your token refresh endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refreshToken
      });

      const { access } = response.data;
      
      // Save new token
      localStorage.setItem('access', access);
      
      // Update authorization header
      originalRequest.headers.Authorization = `Bearer ${access}`;
      
      // Process queued requests
      processQueue(null, access);
      
      console.log('✅ Token refreshed successfully');
      
      // Retry original request
      return API(originalRequest);
      
    } catch (refreshError) {
      console.error('❌ Token refresh failed:', refreshError);
      
      // Process queue with error
      processQueue(refreshError, null);
      
      // Clear tokens and redirect to login
      handleLogout();
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Helper function to handle logout
const handleLogout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user');
  
  // Only redirect if not already on login page
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

export default API;