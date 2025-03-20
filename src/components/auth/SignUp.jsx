import { useState } from "react";
import { Skills } from "../../../data/skills";
import { useDispatch, useSelector } from "react-redux";
import { signupHR, signupUser } from "../../store/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Landing_NavBar } from "../Layouts/Landing_NavBar";

const SignUp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    hrName: "",
    SeekerName: "",
    skills: [],
    experience: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [selectedRole, setSelectedRole] = useState(""); // No role selected initially
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateForm = () => {
    let newErrors = {};

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone Number Validation (exactly 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Password Validation (at least one uppercase, one lowercase, one number, and one special character)
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be 8-12 characters long, contain at least one uppercase, one lowercase, one number, and one special character";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Experience must be greater than 0
    if (
      selectedRole === "jobseeker" &&
      !/^\d+$/.test(formData.experience) // Ensures only 0 or positive integers
    ) {
      newErrors.experience = "Experience must be 0 or a positive integer";
    }

    // HR Name & Skills must be at least 3 characters
    if (selectedRole === "hr" && formData.hrName.length < 3) {
      newErrors.hrName = "HR Name must be at least 3 characters";
    }

    if (selectedRole === "jobseeker" && formData.skills.length < 3) {
      newErrors.skills = "Skills must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "role") {
      setSelectedRole(value);
    }
  };

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;

    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      if (formData.skills.length < 5) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, selectedSkill],
        }));
      } else {
        alert("You can select up to 5 skills only.");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = formData;
      if (selectedRole === "hr") {
        dispatch(signupHR(userData));
        console.log(userData);
        alert("Signup successful!");
        navigate("/login");
      } else if (selectedRole === "jobseeker") {
        dispatch(signupUser(userData));
        console.log(userData);
        alert("Signup successful!");
        navigate("/login");
      }
    }
  };

  return (
    <>
    <Landing_NavBar />
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Create Your Account
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
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Confirm password"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-gray-600 text-sm font-medium mb-2 block">
              Select a Role
            </label>
            <select
              name="role"
              value={selectedRole}
              className="w-full p-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="hr">Sign up as HR</option>
              <option value="jobseeker">Sign up as Jobseeker</option>
            </select>
          </div>

          {selectedRole === "hr" && (
            <>
              <div className="mb-4">
                <label className="text-gray-600 text-sm font-medium mb-2 block">
                  Company Name
                </label>
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600 text-sm font-medium mb-2 block">
                  HR Name
                </label>
                <input
                  name="hrName"
                  type="text"
                  value={formData.hrName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter HR name"
                  required
                />
                {errors.hrName && (
                  <p className="text-red-500 text-xs mt-1">{errors.hrName}</p>
                )}
              </div>
            </>
          )}

          {selectedRole === "jobseeker" && (
            <>
              <div className="mb-4">
                <label className="text-gray-600 text-sm font-medium mb-2 block">
                  JobSeeker Name
                </label>
                <input
                  name="SeekerName"
                  type="text"
                  value={formData.SeekerName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter JobSeeker name"
                  required
                />
                {errors.SeekerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.SeekerName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-600 text-sm font-medium mb-2 block">
                  Skills (Max 5)
                </label>
                <div className="border border-gray-300 rounded-lg px-1 flex flex-wrap bg-gray-50">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white text-sm px-2 py-1 my-2 rounded-full flex items-center mr-2"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-white hover:text-gray-300"
                        onClick={() => removeSkill(skill)}
                      >
                        ✖
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  name="skills"
                  onChange={handleSkillSelect}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                >
                  <option value="">Select Skills</option>
                  {[...new Set(Skills)].map((skill, index) => (
                    <option key={`${skill}-${index}`} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                {errors.skills && (
                  <p className="text-red-500 text-xs mt-1">{errors.skills}</p>
                )}
              </div>
              <div>
                <label className="text-gray-500 text-sm mb-2 block">
                  Experience (Years)
                </label>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0) {
                      handleChange(e);
                    }
                  }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter experience in years"
                  required
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="mt-6 w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Sign Up
            </button>
          </div>
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

export default SignUp;
