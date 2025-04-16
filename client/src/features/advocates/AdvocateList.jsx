import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/api";
import { 
  UserIcon, 
  PlusCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  ScaleIcon
} from "@heroicons/react/24/outline";

const AdvocateList = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/adv/advocates");
        setAdvocates(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching advocates:", err);
        setError("Failed to load advocates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvocates();
  }, []);

  const filteredAdvocates = advocates.filter(advocate => 
    (advocate.name?.toLowerCase().includes(searchTerm.toLowerCase()) || "") || // avoid calling toLowerCase on undefined/null values - TypeError
    (advocate.email?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
    (advocate.bar_number?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <ScaleIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Advocate Management</h1>
              <p className="text-slate-300 mt-1">View and manage all legal advocates</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/advocates/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add New Advocate
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search advocates by name, email or bar number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>

      {/* Advocate List */}
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
            {filteredAdvocates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-left text-slate-500 text-sm">
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Bar Number</th>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Phone</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdvocates.map((advocate) => (
                      <tr 
                        key={advocate.id} 
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">{advocate.name}</td>
                        <td className="px-6 py-4 text-slate-600">{advocate.bar_number}</td>
                        <td className="px-6 py-4 text-slate-600">{advocate.email}</td>
                        <td className="px-6 py-4 text-slate-600">{advocate.phone}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/advocates/${advocate.id}/edit`}
                              className="p-1.5 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors"
                              title="Edit advocate"
                            >
                              <PencilSquareIcon className="w-5 h-5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                {searchTerm ? (
                  <div className="flex flex-col items-center">
                    <MagnifyingGlassIcon className="w-12 h-12 text-slate-300 mb-3" />
                    <p className="text-slate-500 font-medium text-lg">No advocates match your search</p>
                    <p className="text-slate-400 mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ScaleIcon className="w-12 h-12 text-slate-300 mb-3" />
                    <p className="text-slate-500 font-medium text-lg">No advocates yet</p>
                    <p className="text-slate-400 mt-1 mb-4">Add your first advocate to get started</p>
                    <Link
                      to="/advocates/new"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <PlusCircleIcon className="w-5 h-5 mr-2" />
                      Add New Advocate
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvocateList;