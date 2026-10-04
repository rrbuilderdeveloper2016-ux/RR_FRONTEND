import apiClient from './api';

export const inquiryService = {
  async submitConsultation(data) {
    return apiClient.post('/inquiries/consultation', data);
  },

  async submitPropertyEnquiry(data) {
    return apiClient.post('/inquiries/property', data);
  },

  async submitProjectEnquiry(data) {
    return apiClient.post('/inquiries/project', data);
  },

  async submitSellProperty(data) {
    return apiClient.post('/inquiries/sell', data);
  },

  async submitBuildOnPlot(data) {
    return apiClient.post('/inquiries/build-plot', data);
  },

  async submitContact(data) {
    return apiClient.post('/inquiries/contact', data);
  },

  async submitGeneral(data) {
    return apiClient.post('/inquiries', data);
  },

  // Admin Endpoints
  async getAllInquiries(params = {}) {
    const res = await apiClient.get('/inquiries', { params });
    return res.data || [];
  },

  async getInquiryStats() {
    const res = await apiClient.get('/inquiries/stats');
    return res.data || {};
  },

  async updateStatus(id, status, adminNotes) {
    const res = await apiClient.patch(`/inquiries/${id}/status`, { status, adminNotes });
    return res.data;
  },

  async deleteInquiry(id) {
    const res = await apiClient.delete(`/inquiries/${id}`);
    return res.data;
  }
};
