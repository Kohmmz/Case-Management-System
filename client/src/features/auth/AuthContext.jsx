import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [message, setMessage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Rest of your AuthContext code remains the same...
  const login = async (formData) => {
    try {
      const res = await axios.post("/auth/login", formData);
      if (res.data.success) {
        const userData = res.data.advocate;
        setUser(userData);
        setToken(res.data.access_token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.data.access_token);
        setMessage({ type: "success", text: "Login successful!" });
        navigate("/dashboard");
      } else {
        setMessage({ type: "error", text: res.data.message || "Login failed." });
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setMessage({ type: "error", text: error.response?.data?.message || "Login failed. Please try again." });
    }
  };

  const register = async (formData) => {
    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        bar_number: formData.bar_number,
        phone: formData.phone || "",
        specialization: formData.specialization || "",
      };
  
      const res = await axios.post("/adv/advocates", registrationData);
      if (res.status === 201) {
        setMessage({ type: "success", text: "Registration successful! Please login." });
        navigate("/login");
      } else {
        setMessage({ type: "error", text: res.data.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      setMessage({ type: "error", text: error.response?.data?.message || "Registration failed. Please try again." });
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMessage({ type: "info", text: "You have been logged out." });
    navigate("/login");
  };

  const updateProfile = async (formData) => {
    try {
      const res = await axios.put("/auth/profile", formData);
      if (res.data.success) {
        const updatedUser = res.data.advocate;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage({ type: "success", text: "Profile updated successfully!" });
        return true;
      } else {
        setMessage({ type: "error", text: res.data.message || "Profile update failed." });
        return false;
      }
    } catch (error) {
      console.error("Profile update failed:", error.response?.data?.message || error.message);
      setMessage({ type: "error", text: error.response?.data?.message || "Profile update failed. Please try again." });
      return false;
    }
  };

  const checkAuthStatus = async () => {
    if (!token) return false;
    
    try {
      const res = await axios.get("/auth/profile");
      if (res.data.success) {
        setUser(res.data.advocate);
        localStorage.setItem("user", JSON.stringify(res.data.advocate));
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      logout, 
      updateProfile,
      checkAuthStatus,
      isAuthenticated: !!token,
      message, 
      setMessage 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);