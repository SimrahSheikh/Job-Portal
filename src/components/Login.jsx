import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState(""); // 🆕 Track login role

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select HR or JobSeeker");
      return;
    }

    try {
      const response = await axios.post(
        "https://7b14lbqm-3000.inc1.devtunnels.ms/auth/signin",
        {
          ...formData,
          role, // 🆕 Send role to backend
        }
      );
      console.log(response.data.token);
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-gray-800 rounded-lg shadow sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-blue-300">
              Login to your account
            </h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            {/* HR Login */}
            <button
              type="submit"
              onClick={() => setRole("hr")} // 🆕 Set role on click
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              LogIn as an HR
            </button>
            {/* JobSeeker Login */}
            <button
              type="submit"
              onClick={() => setRole("user")} // 🆕 Set role on click
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              LogIn as a JobSeeker
            </button>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <NavLink
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
