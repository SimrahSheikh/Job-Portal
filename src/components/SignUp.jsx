import { useState } from "react";
import { Skills } from "../../data/skills";
import { useDispatch, useSelector } from 'react-redux';
import { signupHR, signupUser } from "../store/slice/AuthSlice";

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
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase, one lowercase, one number, and one special character";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Experience must be greater than 0
    if (
      selectedRole === "jobseeker" &&
      (!formData.experience || formData.experience <= 0)
    ) {
      newErrors.experience = "Experience must be greater than 0";
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
      } else if (selectedRole === "jobseeker") {
        dispatch(signupUser(userData));
        console.log(userData);
        
      }
    }
  };

  return (
    <div className="font-[sans-serif] w-full bg-gray-800 min-h-screen flex flex-col">
      <div className="text-center bg-gray-900 from-blue-800 to-blue-400 min-h-[180px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl text-white mt-3">
          Create your account
        </h4>
      </div>
      <div className="mx-4 mb-4 -mt-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-gray-700 shadow-md sm:p-8 p-4 rounded-md"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-500 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter phone number"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Confirm password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Role</label>
              <select
                name="role"
                value={selectedRole}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Select Role</option>
                <option value="hr">Sign up as HR</option>
                <option value="jobseeker">Sign up as Jobseeker</option>
              </select>
            </div>

            {selectedRole === "hr" && (
              <>
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">
                    HR Name
                  </label>
                  <input
                    name="hrName"
                    type="text"
                    value={formData.hrName}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">
                    JobSeeker Name
                  </label>
                  <input
                    name="SeekerName"
                    type="text"
                    value={formData.SeekerName}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter JobSeeker name"
                    required
                  />
                  {errors.SeekerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.SeekerName}</p>
                  )}
                </div>
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">
                    Skills (Max 5)
                  </label>
                  <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap bg-white">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full flex items-center mr-2 mb-1"
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2"
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
                    value={formData.experience}
                    onChange={handleChange}
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
          </div>

          <div className="flex justify-center">
            <button className="mt-6 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-5 py-2.5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;