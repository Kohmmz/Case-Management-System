import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: { 
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      bar_number: "",
      phone: "",
      specialization: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      bar_number: Yup.string().required("Bar number is required"),
      phone: Yup.string().matches(
        /^[0-9+\-() ]+$/,
        "Phone number is not valid"
      ),
      specialization: Yup.string()
    }),
    onSubmit: (values) => {
      // Remove confirm_password as it's not needed in the backend
      const { confirm_password, ...registrationData } = values;
      register(registrationData);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register as an Advocate</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              className="w-full border p-2 rounded"
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.first_name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              className="w-full border p-2 rounded"
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.last_name}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="w-full border p-2 rounded"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full border p-2 rounded"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full border p-2 rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              className="w-full border p-2 rounded"
            />
            {formik.touched.confirm_password && formik.errors.confirm_password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirm_password}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="bar_number" className="block text-sm font-medium text-gray-700 mb-1">
            Bar Number
          </label>
          <input
            id="bar_number"
            name="bar_number"
            placeholder="Bar Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bar_number}
            className="w-full border p-2 rounded"
          />
          {formik.touched.bar_number && formik.errors.bar_number ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bar_number}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full border p-2 rounded"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Specialization (optional)
          </label>
          <input
            id="specialization"
            name="specialization"
            placeholder="Area of Specialization"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialization}
            className="w-full border p-2 rounded"
          />
          {formik.touched.specialization && formik.errors.specialization ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.specialization}</div>
          ) : null}
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;