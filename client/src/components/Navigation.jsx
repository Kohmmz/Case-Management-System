import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import "../index.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: "📊", path: "/dashboard" },
    { text: "Clients", icon: "👥", path: "/clients" },
    { text: "Cases", icon: "📁", path: "/cases" },
    { text: "Documents", icon: "📄", path: "/documents" },
    { text: "Advocates", icon: "⚖️", path: "/advocates" },
    { text: "Legal Resources", icon: "📚", path: "/resources" },
    { text: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="drawer">
      <div className="drawer-header">
        <h1 className="drawer-title">⚖️ CaseFlow</h1>
      </div>
      <ul className="drawer-menu">
        {menuItems.map((item) => (
          <li key={item.text}>
            <NavLink
              to={item.path}
              className="drawer-link"
              activeClassName="active"
            >
              <span className="drawer-icon">{item.icon}</span>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="drawer-footer">
        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;
