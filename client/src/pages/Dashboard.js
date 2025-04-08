import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, loading, logout } = useAuth();  // Access the user, loading, and logout from context

  if (loading) return <div>Loading...</div>;  // Show loading state while the user profile is being fetched

  if (!user) {
    return <div>You are not logged in. Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.full_name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
