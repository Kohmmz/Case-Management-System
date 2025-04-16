import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  IdentificationIcon,
  ArrowLeftIcon,
  CheckIcon,
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

const AdvocateForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: { name: "", email: "", bar_number: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      bar_number: Yup.string().required("Bar Number is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        if (isEdit) {
          await axios.put(`/adv/advocates/${id}`, values);
        } else {
          await axios.post("/adv/advocates", values);
        }
        navigate("/advocates");
      } catch (err) {
        console.error("Error saving advocate:", err);
        setError("Failed to save advocate. Please try again.");
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchAdvocate = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/adv/advocates/${id}`);
          formik.setValues(res.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching advocate:", err);
          setError("Failed to load advocate data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchAdvocate();
    }
  }, [id, isEdit]);

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isEdit ? "Edit Advocate" : "Add New Advocate"}
              </h1>
              <p className="text-slate-300 mt-1">
                {isEdit ? "Update advocate information" : "Create a new advocate record"}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/advocates"
              className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Advocates
            </Link>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 p-8 mb-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
            <ExclamationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="name"
                name="name"
                placeholder="Enter advocate's full name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 border ${
                  formik.errors.name && formik.touched.name 
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                disabled={loading}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter advocate's email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 border ${
                  formik.errors.email && formik.touched.email 
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                disabled={loading}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Bar Number */}
          <div>
            <label htmlFor="bar_number" className="block text-sm font-medium text-slate-700 mb-1">
              Bar Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="bar_number"
                name="bar_number"
                placeholder="Enter advocate's bar number"
                value={formik.values.bar_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 border ${
                  formik.errors.bar_number && formik.touched.bar_number 
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                disabled={loading}
              />
              {formik.errors.bar_number && formik.touched.bar_number && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {formik.errors.bar_number && formik.touched.bar_number && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.bar_number}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="phone"
                name="phone"
                placeholder="Enter advocate's phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 border ${
                  formik.errors.phone && formik.touched.phone 
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                disabled={loading}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  {isEdit ? "Update Advocate" : "Create Advocate"}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/advocates")}
              className="flex justify-center items-center px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvocateForm;