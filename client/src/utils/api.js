import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Case Management API
export const getAllCases = async () => {
  try {
    const response = await api.get('/cases');
    return response.data;
  } catch (error) {
    console.error('Error fetching all cases:', error);
    throw error;
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await api.post('/cases', caseData);
    return response.data;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

export const getTodayCases = async () => {
  try {
    const response = await api.get('/cases/today');
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s cases:', error);
    throw error;
  }
};

export const getUpcomingCases = async () => {
  try {
    const response = await api.get('/cases/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming cases:', error);
    throw error;
  }
};

export const getCaseTypes = async () => {
  try {
    const response = await api.get('/cases/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching case types:', error);
    throw error;
  }
};

export const getCaseDetails = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching case details:', error);
    throw error;
  }
};

// Document Management
export const uploadDocument = async (caseId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await api.post(`/cases/${caseId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const getDocuments = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Auth API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const registerUser = async (email, password, fullName) => {
  try {
    const response = await api.post('/register', { email, password, fullName });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const response = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Legal Resources
export const getCaseLaw = async () => {
  try {
    const response = await api.get('/resources/case-law');
    return response.data;
  } catch (error) {
    console.error('Error fetching case law:', error);
    throw error;
  }
};

export const searchLegalResources = async (query) => {
  try {
    const response = await api.get('/resources/case-law', { params: { query } });
    return response.data;
  } catch (err) {
    throw new Error('Error searching legal resources');
  }
};
