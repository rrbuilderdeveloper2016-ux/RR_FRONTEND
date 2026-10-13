function containsSensitiveLeak(msg) {
  if (typeof msg !== 'string') return false;
  const lower = msg.toLowerCase();
  return (
    lower.includes('/api/') ||
    lower.includes('http://') ||
    lower.includes('https://') ||
    lower.includes('exception') ||
    lower.includes('trace:') ||
    lower.includes('stacktrace') ||
    lower.includes('sql') ||
    lower.includes('org.springframework') ||
    lower.includes('java.') ||
    lower.includes('bad credentials') ||
    lower.includes('status code')
  );
}

export function sanitizeErrorMessage(error) {
  const status = error.response?.status;
  const rawMsg = error.response?.data?.message || error.response?.data?.error;

  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Connection timed out. Please check your internet connection.';
  }
  if (error.message?.includes('Network Error')) {
    return 'Unable to reach the server. Please check your internet connection.';
  }

  if (status === 400) return 'Invalid request. Please verify the submitted information.';
  if (status === 401) return 'Invalid username or password. Please verify your credentials.';
  if (status === 403) return 'Access denied. You do not have permission to perform this action.';
  if (status === 404) return 'Requested resource was not found.';
  if (status && status >= 500) return 'Unable to process request at this time. Please try again.';

  if (rawMsg && typeof rawMsg === 'string' && !containsSensitiveLeak(rawMsg)) {
    return rawMsg;
  }

  return 'Unable to process request at this time. Please try again.';
}

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Auto-attach JWT Bearer token if admin is logged in
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rr_admin_token');
    if (token) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if expired or invalid
      localStorage.removeItem('rr_admin_token');
      localStorage.removeItem('rr_admin_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    const message = sanitizeErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
