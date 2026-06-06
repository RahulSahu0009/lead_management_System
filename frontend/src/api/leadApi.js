import axios from 'axios';

const leadApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const normalizeError = (error) => ({
  message: error.response?.data?.message || error.message || 'Something went wrong',
  status: error.response?.status || 500,
  data: error.response?.data || null,
});

const unwrapPayload = (response) => response.data?.data ?? response.data;

leadApi.interceptors.request.use((config) => config, (error) => Promise.reject(normalizeError(error)));
leadApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);

export const createLead = async (data) => {
  const response = await leadApi.post('/api/leads', data);
  return unwrapPayload(response);
};

export const getLeads = async (params = {}) => {
  const response = await leadApi.get('/api/leads', { params });
  return unwrapPayload(response);
};

export const getLeadById = async (id) => {
  const response = await leadApi.get(`/api/leads/${id}`);
  return unwrapPayload(response);
};

export const updateLead = async (id, data) => {
  const response = await leadApi.put(`/api/leads/${id}`, data);
  return unwrapPayload(response);
};

export const deleteLead = async (id) => {
  const response = await leadApi.delete(`/api/leads/${id}`);
  return unwrapPayload(response);
};

export const searchLeads = async (query) => {
  const response = await leadApi.get('/api/leads/search', {
    params: { q: query },
  });
  return unwrapPayload(response);
};

export const getStats = async () => {
  const response = await leadApi.get('/api/leads/stats');
  return unwrapPayload(response);
};

export default leadApi;