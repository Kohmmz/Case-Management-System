import React, { useState } from "react";
import axios from "axios";

const ClientForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/clients", form);
      onSuccess();
      setForm({ name: "", email: "", phone: "" });
      setError("");
    } catch (err) {
      setError("Failed to create client.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <button type="submit">Save</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ClientForm;
