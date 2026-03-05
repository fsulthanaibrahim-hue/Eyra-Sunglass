import axios from 'axios';

const API = axios.create({
  baseURL: 'https://eyra-sunglass.onrender.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

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

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

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
        handleLogout();
        return Promise.reject(error);
      }

      console.log('🔄 Attempting to refresh token...');
      
      // ✅ Use the same base URL as your API
      const refreshUrl = `${API.defaults.baseURL}token/refresh/`;
      const response = await axios.post(refreshUrl, {
        refresh: refreshToken
      });

      const { access } = response.data;
      
      localStorage.setItem('access', access);
      
      originalRequest.headers.Authorization = `Bearer ${access}`;
      
      processQueue(null, access);
      
      console.log('✅ Token refreshed successfully');
      
      return API(originalRequest);
      
    } catch (refreshError) {
      console.error('❌ Token refresh failed:', refreshError);
      
      processQueue(refreshError, null);
      
      handleLogout();
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

const handleLogout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user');
  
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

export default API;