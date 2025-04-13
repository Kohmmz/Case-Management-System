import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClientDetails } from "../../utils/api";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const data = await getClientDetails(id);
        setClient(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to load client details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  if (loading) return <p>Loading client details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!client) return <p>No client found.</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{client.name}</h2>
        <div className="flex space-x-3">
          <Link
            to={`/clients/${client.id}/edit`}
            className="text-blue-600 underline"
          >
            Edit
          </Link>
          <Link
            to="/clients"
            className="text-gray-600 underline"
          >
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Contact Information</h3>
            <div className="mt-2 space-y-2">
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phone}</p>
              <p><strong>Address:</strong> {client.address || 'Not provided'}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700">Client Details</h3>
            <div className="mt-2 space-y-2">
              <p><strong>ID:</strong> {client.id}</p>
              {/* Add any other fields your client has */}
              {client.created_at && (
                <p><strong>Created:</strong> {new Date(client.created_at).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;