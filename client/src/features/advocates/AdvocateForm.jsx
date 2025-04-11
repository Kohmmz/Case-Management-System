import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/api";

const AdvocateForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bar_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      bar_number: Yup.string().required("Bar number is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        await axios.put(`/advocates/${id}`, values);
      } else {
        await axios.post("/advocates", values);
      }
      navigate("/advocates");
    },
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`/advocates/${id}`).then((res) => formik.setValues(res.data));
    }
  }, [id]);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Advocate" : "New Advocate"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Advocate Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="bar_number"
          placeholder="Bar Number"
          value={formik.values.bar_number}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          {isEdit ? "Update Advocate" : "Create Advocate"}
        </button>
      </form>
    </div>
  );
};

export default AdvocateForm;
