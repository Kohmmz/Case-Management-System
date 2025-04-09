import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const generateRandomStatusData = () => {
  return [
    { name: 'Open', value: Math.floor(Math.random() * 30 + 10) },
    { name: 'In Progress', value: Math.floor(Math.random() * 25 + 5) },
    { name: 'Closed', value: Math.floor(Math.random() * 40 + 20) },
    { name: 'On Hold', value: Math.floor(Math.random() * 10 + 2) },
  ];
};

const generateBillableHoursData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    hours: Math.floor(Math.random() * 8), // 0-7 hours
  }));
};

export default function StatsChart() {
  const [caseStatusData, setCaseStatusData] = useState([]);
  const [billableHoursData, setBillableHoursData] = useState([]);

  useEffect(() => {
    // simulate data fetch
    setCaseStatusData(generateRandomStatusData());
    setBillableHoursData(generateBillableHoursData());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Case Status Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Case Status Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={caseStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {caseStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Billable Hours Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Weekly Billable Hours</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={billableHoursData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hours" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
