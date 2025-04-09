import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientForm from "./ClientForm";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await axios.get("/api/clients");
      setClients(res.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientCreated = () => {
    fetchClients();
    setShowForm(false);
  };

  return (
    <div>
      <h2>Clients</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Client"}
      </button>
      {showForm && <ClientForm onSuccess={handleClientCreated} />}
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name} ({client.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
