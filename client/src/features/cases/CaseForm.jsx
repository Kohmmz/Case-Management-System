// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../utils/api";

// const CaseForm = () => {
//   const { id } = useParams();
//   const isEdit = Boolean(id);
//   const [clients, setClients] = useState([]);
//   const [advocates, setAdvocates] = useState([]);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       status: "Ongoing",
//       type: "",
//       next_hearing: "",
//       client_id: "",
//       advocate_id: "",
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required("Title is required"),
//       type: Yup.string().required("Type is required"),
//       client_id: Yup.string().required("Client is required"),
//       advocate_id: Yup.string().required("Advocate is required"),
//     }),
//     onSubmit: async (values) => {
//       if (isEdit) {
//         await axios.put(`/cases/${id}`, values);
//       } else {
//         await axios.post("/cases", values);
//       }
//       navigate("/cases");
//     },
//   });

//   useEffect(() => {
//     axios.get("/clients").then((res) => setClients(res.data));
//     axios.get("/advocates").then((res) => setAdvocates(res.data));

//     if (isEdit) {
//       axios.get(`/cases/${id}`).then((res) => formik.setValues(res.data));
//     }
//   }, [id]);

//   return (
//     <div className="max-w-xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">
//         {isEdit ? "Edit Case" : "New Case"}
//       </h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <input
//           name="title"
//           placeholder="Case Title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <select
//           name="advocate_id"
//           value={formik.values.advocate_id}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Advocate</option>
//           {advocates.map((advocate) => (
//             <option key={advocate.id} value={advocate.id}>
//               {advocate.name} ({advocate.bar_number})
//             </option>
//           ))}
//         </select>
//         <select
//           name="client_id"
//           value={formik.values.client_id}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Client</option>
//           {clients.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <select
//           name="type"
//           value={formik.values.type}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Case Type</option>
//           <option value="Civil">Civil</option>
//           <option value="Criminal">Criminal</option>
//           <option value="Family">Family</option>
//         </select>
//         <select
//           name="status"
//           value={formik.values.status}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="Ongoing">Ongoing</option>
//           <option value="Completed">Completed</option>
//         </select>
//         <input
//           type="date"
//           name="next_hearing"
//           value={formik.values.next_hearing}
//           onChange={formik.handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
//           {isEdit ? "Update Case" : "Create Case"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CaseForm;

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
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        {isEdit ? "Edit Case" : "Create New Case"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Case Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Case Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter case title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* Advocate */}
        <div>
          <label htmlFor="advocate_id" className="block text-gray-700 font-medium mb-2">
            Advocate
          </label>
          <select
            id="advocate_id"
            name="advocate_id"
            value={formik.values.advocate_id}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Advocate</option>
            {advocates.map((advocate) => (
              <option key={advocate.id} value={advocate.id}>
                {advocate.name} ({advocate.bar_number})
              </option>
            ))}
          </select>
          {formik.errors.advocate_id && formik.touched.advocate_id && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.advocate_id}</p>
          )}
        </div>

        {/* Client */}
        <div>
          <label htmlFor="client_id" className="block text-gray-700 font-medium mb-2">
            Client
          </label>
          <select
            id="client_id"
            name="client_id"
            value={formik.values.client_id}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          {formik.errors.client_id && formik.touched.client_id && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.client_id}</p>
          )}
        </div>

        {/* Case Type */}
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Case Type
          </label>
          <select
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Case Type</option>
            <option value="Civil">Civil</option>
            <option value="Criminal">Criminal</option>
            <option value="Family">Family</option>
          </select>
          {formik.errors.type && formik.touched.type && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Next Hearing */}
        <div>
          <label htmlFor="next_hearing" className="block text-gray-700 font-medium mb-2">
            Next Hearing Date
          </label>
          <input
            id="next_hearing"
            type="date"
            name="next_hearing"
            value={formik.values.next_hearing}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          {isEdit ? "Update Case" : "Create Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
