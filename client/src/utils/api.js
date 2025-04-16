import axios from "axios";

const api = axios.create({
  baseURL: '/', // Relative path lets Vite dev server proxy handle the routing
  headers: { "Content-Type": "application/json" },
});

// Case Management APIs
export const getAllCases = async () => {
  try {
    const response = await api.get("/api/cases");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cases:", error);
    throw error;
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await api.post("/api/cases", caseData);
    return response.data;
  } catch (error) {
    console.error("Error creating case:", error);
    throw error;
  }
};

export const getTodayCases = async () => {
  try {
    const response = await api.get("/api/cases/today");
    return response.data;
  } catch (error) {
    console.error("Error fetching today's cases:", error);
    throw error;
  }
};

export const getUpcomingCases = async () => {
  try {
    const response = await api.get("/api/cases/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming cases:", error);
    throw error;
  }
};

export const getCaseTypes = async () => {
  try {
    const response = await api.get("/api/cases/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching case types:", error);
    throw error;
  }
};

export const getCaseDetails = async (caseId) => {
  try {
    const response = await api.get(`/api/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case details:", error);
    throw error;
  }
};

// Document APIs
export const uploadDocument = async (caseId, { file, title, document_type }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("document_type", document_type);
  try {
    const response = await api.post(`/docs/api/cases/${caseId}/documents`, formData, {
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
    const response = await api.get(`/docs/api/cases/${caseId}/documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Auth APIs
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const registerUser = async (registrationData) => {
  try {
    const response = await api.post("/adv/advocates", registrationData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await api.get("/auth/profile", {
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
export const searchLegalResources = async (query) => {
  try {
    const response = await api.get("/resources/resources", {
      params: { query },
    });
    return response.data;
  } catch (err) {
    throw new Error("Error searching legal resources");
  }
};

// Clients API
export const getAllClients = async () => {
  try {
    const response = await api.get("/clients/clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    throw error;
  }
};

export const getClientDetails = async (clientId) => {
  try {
    const response = await api.get(`/clients/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await api.post("/clients/clients", clientData);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await api.put(`/clients/clients/${clientId}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await api.delete(`/clients/api/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const getClientCases = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/cases`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client cases:", error);
    throw error;
  }
};

export default api;