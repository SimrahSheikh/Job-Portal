import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Using Lucide Icons
import { Landing_NavBar } from "../Layouts/Landing_NavBar";

const HRLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("");
  const [apiError, setApiError] = useState(""); // Stores API error message
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
        formData.password
      )
    ) {
      newErrors.password = "Invalid Password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Reset API error

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        ...formData,
        role,
      });

      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate(role === "hr" ? "/hr" : "/user/jobs");
    } catch (error) {
      console.log(error.response);
      setApiError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <Landing_NavBar />

      <section className="flex items-center justify-center  min-h-screen bg-w mb-10">

        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-center text-2xl font-bold text-blue-600">
            Login to your account
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* API Error Display */}
            {apiError && (
              <p className="text-red-600 text-sm text-center">{apiError}</p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <p
                className="text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </p>
            </div>

            {/* HR Login Button */}
            <button
              type="submit"
              onClick={() => setRole("hr")}
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
            >
              HR Log In
            </button>

            {/* Signup Redirect */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Not a member?{" "}
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </section>
      <div className="bg-gray-700 text-white py-6">
        <footer className="bg-gray-700 text-white text-center py-6">
          <p>&copy; 2025 Job Portal. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default HRLogin;
