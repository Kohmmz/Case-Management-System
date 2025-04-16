import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Phone, Award, Briefcase, UserPlus, AlertCircle } from "lucide-react";

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
      specialization: Yup.string(),
    }),
    onSubmit: (values) => {
      // Remove confirm_password as it's not needed in the backend
      const { confirm_password, ...registrationData } = values;
      register(registrationData);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center">
            CaseFlow
          </h2>
          <p className="text-slate-500 mt-2">Legal case management system</p>
        </div>
        
        {/* Card container */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Create an account</h2>
          
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="first_name"
                    name="first_name"
                    placeholder="John"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      formik.touched.first_name && formik.errors.first_name 
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="flex items-center mt-1.5 text-red-500 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {formik.errors.first_name}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      formik.touched.last_name && formik.errors.last_name 
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="flex items-center mt-1.5 text-red-500 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {formik.errors.last_name}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formik.touched.username && formik.errors.username 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {formik.touched.username && formik.errors.username ? (
                <div className="flex items-center mt-1.5 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formik.touched.email && formik.errors.email 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="flex items-center mt-1.5 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      formik.touched.password && formik.errors.password 
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex items-center mt-1.5 text-red-500 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="••••••••"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      formik.touched.confirm_password && formik.errors.confirm_password 
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                  />
                  {formik.touched.confirm_password && formik.errors.confirm_password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
                {formik.touched.confirm_password && formik.errors.confirm_password ? (
                  <div className="flex items-center mt-1.5 text-red-500 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {formik.errors.confirm_password}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="bar_number" className="block text-sm font-medium text-slate-700 mb-1.5">
                Bar Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award size={18} className="text-slate-400" />
                </div>
                <input
                  id="bar_number"
                  name="bar_number"
                  placeholder="BAR12345678"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bar_number}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formik.touched.bar_number && formik.errors.bar_number 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                />
                {formik.touched.bar_number && formik.errors.bar_number && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {formik.touched.bar_number && formik.errors.bar_number ? (
                <div className="flex items-center mt-1.5 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {formik.errors.bar_number}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  placeholder="070 123 4567"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formik.touched.phone && formik.errors.phone 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="flex items-center mt-1.5 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-1.5">
                Specialization (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase size={18} className="text-slate-400" />
                </div>
                <input
                  id="specialization"
                  name="specialization"
                  placeholder="Corporate Law, Criminal Defense, etc."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialization}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    formik.touched.specialization && formik.errors.specialization 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-800`}
                />
                {formik.touched.specialization && formik.errors.specialization && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              {formik.touched.specialization && formik.errors.specialization ? (
                <div className="flex items-center mt-1.5 text-red-500 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {formik.errors.specialization}
                </div>
              ) : null}
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-indigo-200 transition duration-200 flex items-center justify-center"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={18} className="mr-2" />
                  Create account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            © 2025 CaseFlow Legal Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;