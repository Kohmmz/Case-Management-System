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
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        {isEdit ? "Edit Client" : "Add New Client"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            id="address"
            name="address"
            placeholder="Enter address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          {isEdit ? "Update Client" : "Create Client"}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;