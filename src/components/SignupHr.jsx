import { useState } from "react";

const SignupHr = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form submitted", formData);
  };

  return (
    <div className="font-[sans-serif] w-full bg-gray-800 min-h-screen flex flex-col">
      <div className="text-center bg-gray-900 from-blue-800 to-blue-400 min-h-[180px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl text-white mt-3">
          Create your HR account
        </h4>
      </div>
      <div className="mx-4 mb-4 -mt-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-gray-700 shadow-md sm:p-8 p-4 rounded-md"
        >
          <div className="grid sm:grid-cols-2 gap-6">
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
            </div>
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

export default SignupHr;
