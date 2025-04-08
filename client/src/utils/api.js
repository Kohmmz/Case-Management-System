// client/src/utils/api.js
import axios from 'axios';

// Define the base URL for your API (change if necessary)
const BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance for easy API calls
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch all cases
export const getCases = async (filters) => {
  try {
    const response = await api.get('/cases', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

// Fetch a single case's details
export const getCaseDetails = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching case details:', error);
    throw error;
  }
};

// Upload document for a case
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

// Fetch all documents for a specific case
export const getDocuments = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Get case law from the legal resources
export const getCaseLaw = async () => {
  try {
    const response = await api.get('/resources/case-law');
    return response.data;
  } catch (error) {
    console.error('Error fetching case law:', error);
    throw error;
  }
};

// API call to login the user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);  // Save the token in localStorage
    return response.data.user;  // Return the user data
  } catch (error) {
    throw new Error('Login failed');
  }
};

// API call to register a new user
export const registerUser = async (email, password, fullName) => {
  try {
    const response = await api.post('/register', { email, password, fullName });
    localStorage.setItem('token', response.data.token);  // Save the token in localStorage
    return response.data.user;  // Return the user data
  } catch (error) {
    throw new Error('Registration failed');
  }
};

// API call to get the current user's profile
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

// API call to logout the user
export const logoutUser = () => {
  localStorage.removeItem('token');  // Remove the token from localStorage
};

// API to search legal resources
export const searchLegalResources = async (query) => {
  try {
    const response = await api.get('/resources/case-law', { params: { query } });
    return response.data;
  } catch (err) {
    throw new Error('Error searching legal resources');
  }
};
