import apiClient from './api';
import { initialProjects } from '../data/initialData';

export const projectService = {
  async getAllProjects(params = {}) {
    try {
      const res = await apiClient.get('/projects', { params });
      return res.data || initialProjects;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local projects:', err.message);
      let list = [...initialProjects];
      if (params.category && params.category.toLowerCase() !== 'all') {
        list = list.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.status && params.status.toLowerCase() !== 'all') {
        list = list.filter(p => p.status.toLowerCase() === params.status.toLowerCase());
      }
      return list;
    }
  },

  async getProjectById(id) {
    try {
      const res = await apiClient.get(`/projects/${id}`);
      return res.data;
    } catch (err) {
      console.warn(`Backend unavailable for project ${id}, using local data:`, err.message);
      const found = initialProjects.find(p => p.id === id);
      if (!found) throw new Error('Project not found');
      return found;
    }
  },

  async getFeaturedProjects() {
    try {
      const res = await apiClient.get('/projects/featured');
      return res.data || initialProjects.slice(0, 3);
    } catch (err) {
      return initialProjects.slice(0, 3);
    }
  }
};
