import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient, getClientDetails, updateClient } from "../../utils/api";

const ClientForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
// create client
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", address: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        if (isEdit) {
          // Use your update endpoint: /clients/clients/:id
          await updateClient(id, values);
        } else {
          // Use your create endpoint: /clients/clients
          await createClient(values);
        }
        navigate("/clients");
      } catch (err) {
        console.error("Error saving client:", err);
        setError("Failed to save client. Please try again.");
        setLoading(false);
      }
    },
  });
// get client details
  useEffect(() => {
    if (isEdit) {
      const fetchClient = async () => {
        try {
          setLoading(true);
          // Use your get client endpoint: /clients/clients/:id
          const data = await getClientDetails(id);
          formik.setValues(data);
          setError(null);
        } catch (err) {
          console.error("Error fetching client:", err);
          setError("Failed to load client data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchClient();
    }
  }, [id, isEdit]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        {isEdit ? "Edit Client" : "Add New Client"}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
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
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
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
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
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
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
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
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEdit ? "Updating..." : "Creating..."}
              </span>
            ) : (
              <span>{isEdit ? "Update Client" : "Create Client"}</span>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/clients")}
            className="w-1/3 bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;