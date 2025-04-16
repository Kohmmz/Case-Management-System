import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/api";
import { 
  BriefcaseIcon, 
  PlusCircleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/cases", { params: filters });
      setCases(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cases:", err);
      setError("Failed to load cases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [filters]);

  const filteredCases = Array.isArray(cases) 
    ? cases.filter(c => 
        c.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <BriefcaseIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
              <p className="text-slate-300 mt-1">View and manage all your legal cases</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/cases/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add New Case
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search cases by title or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  className="pl-9 pr-3 py-2 border border-slate-300 rounded-lg appearance-none bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Statuses</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FunnelIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="pl-9 pr-3 py-2 border border-slate-300 rounded-lg appearance-none bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Family">Family</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BriefcaseIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case List */}
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-12 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-500 text-sm">
                    <th className="px-6 py-3 font-medium">Title</th>
                    <th className="px-6 py-3 font-medium">Client</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Next Hearing</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.length > 0 ? (
                    filteredCases.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                        <td className="px-6 py-4 text-slate-600">{c.client_name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            c.type === 'Civil' ? 'bg-blue-100 text-blue-800' :
                            c.type === 'Criminal' ? 'bg-red-100 text-red-800' :
                            c.type === 'Family' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            c.status === 'Ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {c.next_hearing ? (
                            <div className="flex items-center text-slate-600">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(c.next_hearing).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-slate-400">Not scheduled</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/cases/${c.id}`}
                              className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                              title="View details"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                        {searchTerm || filters.status || filters.type ? (
                          <div className="flex flex-col items-center">
                            <MagnifyingGlassIcon className="w-8 h-8 text-slate-300 mb-3" />
                            <p className="font-medium">No cases match your search criteria</p>
                            <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <BriefcaseIcon className="w-8 h-8 text-slate-300 mb-3" />
                            <p className="font-medium">No cases found</p>
                            <p className="text-sm mt-1 mb-4">Create your first case to get started</p>
                            <Link
                              to="/cases/new"
                              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                              <PlusCircleIcon className="w-5 h-5 mr-2" />
                              Add New Case
                            </Link>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseList;