import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/api";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get(`/clients/${id}`).then((res) => {
      setClient(res.data);
    });
  }, [id]);

  if (!client) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{client.name}</h2>
        <Link
          to={`/clients/${client.id}/edit`}
          className="text-blue-600 underline"
        >
          Edit
        </Link>
      </div>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Address:</strong> {client.address}</p>
        {/* Optional: Show list of cases here */}
      </div>
    </div>
  );
};

export default ClientDetail;
