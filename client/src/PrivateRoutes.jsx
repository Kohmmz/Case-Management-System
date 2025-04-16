import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;