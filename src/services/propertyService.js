import apiClient from './api';
import { initialProperties } from '../data/initialData';

export const propertyService = {
  async getAllProperties(params = {}) {
    try {
      const res = await apiClient.get('/properties', { params });
      return res.data || initialProperties;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local properties:', err.message);
      let list = [...initialProperties];
      if (params.location) {
        list = list.filter(p => p.location.toLowerCase().includes(params.location.toLowerCase()) || p.locationSlug.toLowerCase().includes(params.location.toLowerCase()));
      }
      if (params.type) {
        list = list.filter(p => p.type.toLowerCase() === params.type.toLowerCase());
      }
      if (params.status) {
        list = list.filter(p => p.status.toLowerCase() === params.status.toLowerCase());
      }
      if (params.bhk) {
        list = list.filter(p => p.bhk.includes(params.bhk[0]));
      }
      return list;
    }
  },

  async getPropertyById(id) {
    try {
      const res = await apiClient.get(`/properties/${id}`);
      return res.data;
    } catch (err) {
      console.warn(`Backend unavailable for property ${id}, using local data:`, err.message);
      const found = initialProperties.find(p => p.id === id);
      if (!found) throw new Error('Property not found');
      return found;
    }
  },

  async getFeaturedProperties() {
    try {
      const res = await apiClient.get('/properties/featured');
      return res.data || initialProperties.filter(p => p.featured);
    } catch (err) {
      return initialProperties.filter(p => p.featured);
    }
  }
};
