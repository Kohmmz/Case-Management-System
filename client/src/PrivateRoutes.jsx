import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./features/auth/AuthContext";

const PrivateRoute = () => {
  const { token } = useAuth();

  // Placeholder for token validation logic
  const isTokenValid = () => {
    // Add logic to validate token (e.g., check expiration)
    return !!token;
  };

  return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;