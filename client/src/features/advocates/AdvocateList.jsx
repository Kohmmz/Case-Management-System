import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/api";

const AdvocateList = () => {
  const [advocates, setAdvocates] = useState([]);

  const fetchAdvocates = async () => {
    const res = await axios.get("/advocates");
    setAdvocates(res.data);
  };

  useEffect(() => {
    fetchAdvocates();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advocates</h2>
        <Link to="/advocates/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Advocate
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Bar Number</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate) => (
              <tr key={advocate.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{advocate.name}</td>
                <td className="p-3">{advocate.bar_number}</td>
                <td className="p-3">{advocate.email}</td>
                <td className="p-3 text-center">
                  <Link to={`/advocates/${advocate.id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {advocates.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No advocates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvocateList;
