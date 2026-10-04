import apiClient from './api';

export const authService = {
  async login(username, password) {
    const res = await apiClient.post('/auth/login', { username, password });
    if (res.data?.token) {
      localStorage.setItem('rr_admin_token', res.data.token);
      localStorage.setItem('rr_admin_user', JSON.stringify({
        username: res.data.username,
        email: res.data.email,
        fullName: res.data.fullName,
        role: res.data.role,
      }));
    }
    return res.data;
  },

  logout() {
    localStorage.removeItem('rr_admin_token');
    localStorage.removeItem('rr_admin_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('rr_admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('rr_admin_token');
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('rr_admin_token'));
  },

  async changePassword(currentPassword, newPassword) {
    const res = await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return res.data;
  },

  async fetchMe() {
    const res = await apiClient.get('/auth/me');
    return res.data;
  }
};
