import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../utils/api";

const ClientForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", address: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        await axios.put(`/clients/${id}`, values);
      } else {
        await axios.post("/clients", values);
      }
      navigate("/clients");
    },
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`/clients/${id}`).then((res) => {
        formik.setValues(res.data);
      });
    }
  }, [id]);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Client" : "New Client"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          {isEdit ? "Update Client" : "Create Client"}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
