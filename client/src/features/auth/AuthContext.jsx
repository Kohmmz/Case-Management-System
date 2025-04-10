import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (formData) => {
  try {
    const res = await axios.post("/auth/login", formData);
    setUser(res.data.user);
    setToken(res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.access_token);
    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    alert("Login failed: " + (error.response?.data?.message || "Please try again."));
  }
};

const register = async (formData) => {
  try {
    await axios.post("/auth/register", formData);
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
    alert("Registration failed: " + (error.response?.data?.message || "Please try again."));
  }
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
