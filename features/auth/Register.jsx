import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";

const Register = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", bar_number: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
      bar_number: Yup.string().required("Required"),
    }),
    onSubmit: register,
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full border p-2 rounded"
        />
        <input
          name="bar_number"
          placeholder="Bar Number"
          onChange={formik.handleChange}
          value={formik.values.bar_number}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;