import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/api";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({ status: "", type: "" });

  const fetchCases = async () => {
    const res = await axios.get("/cases", { params: filters });
    setCases(res.data);
  };

  useEffect(() => {
    fetchCases();
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cases</h2>
        <Link to="/cases/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Case
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
          <option value="Family">Family</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Next Hearing</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.client_name}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">{c.type}</td>
                <td className="p-3">{c.next_hearing}</td>
                <td className="p-3 text-center">
                  <Link to={`/cases/${c.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseList;
