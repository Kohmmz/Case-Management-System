import React from "react";
import StatsChart from "./StatsChart";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome back, Advocate!</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Clients</h3>
          <p>25 Active Clients</p>
        </div>
        <div className="dashboard-card">
          <h3>Cases</h3>
          <p>10 Ongoing Cases</p>
        </div>
        <div className="dashboard-card">
          <h3>Upcoming Hearings</h3>
          <p>3 Today</p>
        </div>
        <div className="dashboard-card">
          <h3>Documents</h3>
          <p>12 Uploaded</p>
        </div>
      </div>

      <StatsChart />
    </div>
  );
};

export default Dashboard;



