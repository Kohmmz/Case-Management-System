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
export const getCases = async () => {
  try {
    const response = await api.get('/cases');
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
export const uploadDocument = async (caseId, formData) => {
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