import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, Clock, ArrowUpRight, BarChart2, TrendingUp, CheckCircle, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ ongoing: 0, completed: 0, today_hearings: 0 });
  const [todayHearings, setTodayHearings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const statsRes = await axios.get("/dashboard/stats");
        const hearingsRes = await axios.get("/hearings/today");
        
        setStats(statsRes.data);
        setTodayHearings(hearingsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const data = [
    { name: "Ongoing", value: stats.ongoing, color: "#4f46e5" },
    { name: "Completed", value: stats.completed, color: "#10b981" },
    { name: "Today's Hearings", value: stats.today_hearings, color: "#f59e0b" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-b-xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-slate-300 mt-2">Welcome back to CaseFlow</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 pb-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg hover:border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <BarChart2 size={20} />
                    </span>
                    <div className="flex items-center text-xs font-medium text-indigo-500">
                      <TrendingUp size={14} className="mr-1" />
                      <span>Active</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Ongoing Cases</p>
                  <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold text-slate-800">{stats.ongoing}</h2>
                    <span className="text-xs font-medium text-slate-400">cases</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg hover:border-emerald-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <CheckCircle size={20} />
                    </span>
                    <div className="flex items-center text-xs font-medium text-emerald-500">
                      <ArrowUpRight size={14} className="mr-1" />
                      <span>Completed</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Completed Cases</p>
                  <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold text-slate-800">{stats.completed}</h2>
                    <span className="text-xs font-medium text-slate-400">cases</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-lg hover:border-amber-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Calendar size={20} />
                    </span>
                    <div className="flex items-center text-xs font-medium text-amber-500">
                      <span>Today</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Today's Hearings</p>
                  <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold text-slate-800">{stats.today_hearings}</h2>
                    <span className="text-xs font-medium text-slate-400">hearings</span>
                  </div>
                </div>
              </div>

              {/* Graph and Today's Hearings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">Case Overview</h3>
                    <div className="flex space-x-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        This Month
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={false}
                      />
                      <YAxis 
                        allowDecimals={false} 
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "0.75rem",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }}
                        labelStyle={{ color: "#1e293b", fontWeight: "600" }}
                        cursor={{ fill: "rgba(243, 244, 246, 0.6)" }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[6, 6, 0, 0]}
                        barSize={50}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Today's Hearings */}
                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">Today's Hearings</h3>
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 text-xs font-medium">
                      {todayHearings.length}
                    </span>
                  </div>
                  
                  {todayHearings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                      <div className="p-4 bg-amber-50 rounded-full mb-4">
                        <Calendar size={32} className="text-amber-500" />
                      </div>
                      <p className="text-sm font-medium">No hearings scheduled for today</p>
                      <p className="text-xs text-slate-400 mt-1">You're all clear for now</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {Array.isArray(todayHearings) && todayHearings.map((hearing) => (
                        <li key={hearing.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group cursor-pointer flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-medium text-slate-800 mb-1 line-clamp-1">
                              {hearing.case_title}
                            </div>
                            <div className="flex items-center text-xs text-slate-500">
                              <Clock size={14} className="mr-1 text-amber-500" />
                              {hearing.hearing_time}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <button className="w-full mt-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2 border-t border-slate-100">
                    View all hearings
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;