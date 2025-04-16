import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../utils/api";
import { 
  BriefcaseIcon, 
  UserIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckIcon,
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

const CaseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [clients, setClients] = useState([]);
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      try {
        setLoading(true);
        setError(null);
        
        if (isEdit) {
          await axios.put(`/cases/${id}`, values);
        } else {
          await axios.post("/cases", values);
        }
        navigate("/cases");
      } catch (err) {
        console.error("Error saving case:", err);
        setError("Failed to save case. Please try again.");
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientsRes, advocatesRes] = await Promise.all([
          axios.get("/clients"),
          axios.get("/advocates")
        ]);
        setClients(clientsRes.data);
        setAdvocates(advocatesRes.data);
        
        if (isEdit) {
          const caseRes = await axios.get(`/cases/${id}`);
          formik.setValues(caseRes.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load necessary data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEdit]);

  return (
    <div className="bg-slate-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg mr-4">
              <BriefcaseIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isEdit ? "Edit Case" : "Create New Case"}
              </h1>
              <p className="text-slate-300 mt-1">
                {isEdit ? "Update case information" : "Create a new case record"}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/cases"
              className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Cases
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
          {/* Case Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Case Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BriefcaseIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="title"
                name="title"
                placeholder="Enter case title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 border ${
                  formik.errors.title && formik.touched.title 
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                disabled={loading}
              />
              {formik.errors.title && formik.touched.title && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {formik.errors.title && formik.touched.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>

          {/* Advocate */}
          <div>
            <label htmlFor="advocate_id" className="block text-sm font-medium text-slate-700 mb-1">
              Advocate <span className="text-red-500">*</span>
            </label>
            <select
              id="advocate_id"
              name="advocate_id"
              value={formik.values.advocate_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-3 border ${
                formik.errors.advocate_id && formik.touched.advocate_id 
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" 
                  : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
              disabled={loading}
            >
              <option value="">Select Advocate</option>
              {advocates.map((advocate) => (
                <option key={advocate.id} value={advocate.id}>
                  {advocate.name} ({advocate.bar_number})
                </option>
              ))}
            </select>
            {formik.errors.advocate_id && formik.touched.advocate_id && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.advocate_id}</p>
            )}
          </div>

          {/* Client */}
          <div>
            <label htmlFor="client_id" className="block text-sm font-medium text-slate-700 mb-1">
              Client <span className="text-red-500">*</span>
            </label>
            <select
              id="client_id"
              name="client_id"
              value={formik.values.client_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-3 border ${
                formik.errors.client_id && formik.touched.client_id 
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" 
                  : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
              disabled={loading}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {formik.errors.client_id && formik.touched.client_id && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.client_id}</p>
            )}
          </div>

          {/* Case Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
              Case Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-3 border ${
                formik.errors.type && formik.touched.type 
                  ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" 
                  : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
              disabled={loading}
            >
              <option value="">Select Case Type</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Family">Family</option>
            </select>
            {formik.errors.type && formik.touched.type && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.type}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full px-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
              disabled={loading}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Next Hearing */}
          <div>
            <label htmlFor="next_hearing" className="block text-sm font-medium text-slate-700 mb-1">
              Next Hearing Date <span className="text-slate-400 text-xs font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="next_hearing"
                type="date"
                name="next_hearing"
                value={formik.values.next_hearing}
                onChange={formik.handleChange}
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
                disabled={loading}
              />
            </div>
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
                  {isEdit ? "Update Case" : "Create Case"}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/cases")}
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

export default CaseForm;