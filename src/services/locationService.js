import apiClient from './api';
import { initialLocations } from '../data/initialData';

export const locationService = {
  async getAllLocations() {
    try {
      const res = await apiClient.get('/locations');
      return res.data || initialLocations;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local locations:', err.message);
      return initialLocations;
    }
  },

  async getLocationBySlug(slug) {
    try {
      const res = await apiClient.get(`/locations/${slug}`);
      return res.data;
    } catch (err) {
      const found = initialLocations.find(l => l.slug === slug);
      if (!found) throw new Error('Location not found');
      return found;
    }
  }
};
