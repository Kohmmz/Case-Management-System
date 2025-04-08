import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getProfile, logoutUser } from '../utils/api';

// Create the context
const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Stores the logged-in user data
  const [loading, setLoading] = useState(true);  // To handle loading state while fetching profile
  const [error, setError] = useState(null);  // Stores any error that occurs during authentication

  const navigate = useNavigate();

  // Check for an existing user session when the app loads
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getProfile();  // Fetch the user's profile from the backend
        setUser(userProfile);
      } catch (err) {
        setUser(null);  // No user profile found, so the user is not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const loggedInUser = await loginUser(email, password); // Call the login API
      setUser(loggedInUser);
      navigate('/dashboard');  // Redirect to the dashboard after successful login
    } catch (err) {
      setError('Login failed');
    }
  };

  // Register function
  const register = async (email, password, fullName) => {
    try {
      const newUser = await registerUser(email, password, fullName); // Call the register API
      setUser(newUser);
      navigate('/dashboard');  // Redirect to the dashboard after successful registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();  // Call the logout API to clear the session
    setUser(null);
    navigate('/login');  // Redirect to the login page after logout
  };

  // Provide the context to child components
  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in any component
export const useAuth = () => React.useContext(AuthContext);