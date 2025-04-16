import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const Login = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: login,
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Welcome back</h2>
          
          <form onSubmit={formik.handleSubmit} className="space-y-5">
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                  Forgot password?
                </Link>
              </div>
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

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-indigo-200 transition duration-200 flex items-center justify-center"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} className="mr-2" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-800">
                Create account
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

export default Login;