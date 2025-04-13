import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;

// Case Management API
export const getAllCases = async () => {
  try {
    const response = await api.get("/cases");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cases:", error);
    throw error;
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await api.post("/cases", caseData);
    return response.data;
  } catch (error) {
    console.error("Error creating case:", error);
    throw error;
  }
};

export const getTodayCases = async () => {
  try {
    const response = await api.get("/cases/today");
    return response.data;
  } catch (error) {
    console.error("Error fetching today's cases:", error);
    throw error;
  }
};

export const getUpcomingCases = async () => {
  try {
    const response = await api.get("/cases/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming cases:", error);
    throw error;
  }
};

export const getCaseTypes = async () => {
  try {
    const response = await api.get("/cases/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching case types:", error);
    throw error;
  }
};

export const getCaseDetails = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case details:", error);
    throw error;
  }
};

// Document Management (list,upload,delete) APIs
export const uploadDocument = async (
  caseId,
  { file, title, document_type }
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("document_type", document_type);
  try {
    const response = await api.post(`/cases/${caseId}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export const getDocuments = async (caseId) => {
  try {
    const response = await api.get(`/cases/${caseId}/documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Auth API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const registerUser = async (email, password, fullName) => {
  try {
    const response = await api.post("/register", { email, password, fullName });
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Legal Resources
export const getCaseLaw = async () => {
  try {
    const response = await api.get("/resources/case-law");
    return response.data;
  } catch (error) {
    console.error("Error fetching case law:", error);
    throw error;
  }
};

export const searchLegalResources = async (query) => {
  try {
    const response = await api.get("/resources/case-law", {
      params: { query },
    });
    return response.data;
  } catch (err) {
    throw new Error("Error searching legal resources");
  }
};

// Client Management API

// get all clients
export const getAllClients = async () => {
  try {
    const response = await api.get("/clients/clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    throw error;
  }
};

// get client details
export const getClientDetails = async (clientId) => {
  try {
    const responce = await api.get(`/clients/clients/${clientId}`);
    return responce.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    throw error;
  }
};

// create client
export const createClient = async (clientData) => {
  try {
    const responce = await api.post("/clients/clients", clientData);
    return responce.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

// update client
export const updateClient = async (clientId, clientData) => {
  try {
    const response = await api.put(`/clients/clients/${clientId}`, clientData); // to change
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// delete client
export const deleteClient = async (clientId) => {
  try {
    const response = await api.delete(`/clients/${clientId}`); // to change
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

// get clietn cases
export const getClientCases = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/cases`); // to change
    return response.data;
  } catch (error) {
    console.error("Error fetching client cases:", error);
    throw error;
  }
};
