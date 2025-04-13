import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ ongoing: 0, completed: 0, today_hearings: 0 });
  const [todayHearings, setTodayHearings] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/dashboard/stats");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchTodayHearings = async () => {
      const res = await axios.get("/hearings/today");
      setTodayHearings(res.data);
    };

    fetchTodayHearings();
  }, []);

  const data = [
    { name: "Ongoing", value: stats.ongoing },
    { name: "Completed", value: stats.completed },
    { name: "Today's Hearings", value: stats.today_hearings },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Today's Hearings Notification */}
      {todayHearings.length > 0 && (
        <div className="flex items-center space-x-2 bg-yellow-100 p-4 rounded">
          <span className="text-yellow-600 font-semibold">Today's Hearings:</span>
          <ul className="text-gray-700">
            {todayHearings.map((hearing) => (
              <li key={hearing.id}>
                {hearing.case_title} at {hearing.hearing_time}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Ongoing Cases</p>
          <h2 className="text-2xl font-bold">{stats.ongoing}</h2>
        </div>

        <div className="bg-green-50 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Completed Cases</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>

        <div className="bg-yellow-50 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Today’s Hearings</p>
          <h2 className="text-2xl font-bold">{stats.today_hearings}</h2>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Case Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;