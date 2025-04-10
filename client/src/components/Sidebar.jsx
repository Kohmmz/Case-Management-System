import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [todayHearings, setTodayHearings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayHearings = async () => {
      try {
        const res = await axios.get("/hearings/today");
        setTodayHearings(res.data);
      } catch (err) {
        console.error("Failed to fetch today's hearings:", err);
        setError("Unable to load today's hearings.");
      }
    };

    fetchTodayHearings();
  }, []);

  return (
    <div className="w-64 bg-gray-800 text-white p-6 space-y-4">
      <h2 className="text-xl font-semibold">CaseFlow</h2>

      {/* Sidebar Links */}
      <div className="space-y-2">
        <Link
          to="/dashboard"
          className="block text-gray-300 hover:text-white"
          aria-current="page"
        >
          Dashboard
        </Link>
        <Link
          to="/advocates"
          className="block text-gray-300 hover:text-white"
          aria-current="page"
        >
          Advocates
        </Link>
        <Link
          to="/clients"
          className="block text-gray-300 hover:text-white"
          aria-current="page"
        >
          Clients
        </Link>
      </div>

      {/* Today's Hearings Notification */}
      {error && (
        <div className="bg-red-600 text-white p-2 rounded mt-4 text-center">
          <span className="font-semibold">{error}</span>
        </div>
      )}
      {todayHearings.length > 0 && (
        <div className="bg-yellow-600 text-white p-2 rounded mt-4 text-center">
          <span className="font-semibold">Today's Hearings</span>
          <span className="block">({todayHearings.length})</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
