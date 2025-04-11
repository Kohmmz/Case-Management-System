import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/api";

const CaseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [clients, setClients] = useState([]);
  const [advocates, setAdvocates] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "Ongoing",
      type: "",
      next_hearing: "",
      client_id: "",
      advocate_id: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      type: Yup.string().required("Type is required"),
      client_id: Yup.string().required("Client is required"),
      advocate_id: Yup.string().required("Advocate is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        await axios.put(`/cases/${id}`, values);
      } else {
        await axios.post("/cases", values);
      }
      navigate("/cases");
    },
  });

  useEffect(() => {
    axios.get("/clients").then((res) => setClients(res.data));
    axios.get("/advocates").then((res) => setAdvocates(res.data));

    if (isEdit) {
      axios.get(`/cases/${id}`).then((res) => formik.setValues(res.data));
    }
  }, [id]);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Case" : "New Case"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Case Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="advocate_id"
          value={formik.values.advocate_id}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Advocate</option>
          {advocates.map((advocate) => (
            <option key={advocate.id} value={advocate.id}>
              {advocate.name} ({advocate.bar_number})
            </option>
          ))}
        </select>
        <select
          name="client_id"
          value={formik.values.client_id}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Case Type</option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
          <option value="Family">Family</option>
        </select>
        <select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          name="next_hearing"
          value={formik.values.next_hearing}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          {isEdit ? "Update Case" : "Create Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
