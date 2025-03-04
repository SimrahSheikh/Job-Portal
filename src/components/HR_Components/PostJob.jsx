import React, { useState } from "react";
import { Skills } from "../../assets/skills";
import { Cities } from "../../assets/cities";
import axios from "axios";

const initialFields = {
  CompanyName: "",
  Title: "",
  JobType: "",
  Location: "",
  JobDescription: "",
  Salary: "",
  Experience: "",
  SkillsReq: "",
  Vacancy: "",
  lastDate: "",
};

const PostJob = () => {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };

    // Convert value to a number only if it's a numeric field
    let numericValue = value;
    if (["Salary", "Vacancy", "Experience"].includes(name)) {
      numericValue = value === "" ? "" : Math.max(0, Number(value)); // Prevent negatives
    }

    // Validate for negative values
    if (
      ["Salary", "Vacancy", "Experience"].includes(name) &&
      numericValue < 0
    ) {
      tempErrors[
        name
      ] = `Invalid ${name.toLowerCase()}, please enter a positive value`;
    } else {
      delete tempErrors[name]; // Remove error if value is valid
    }

    setErrors(tempErrors);
    setFields((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setFields((prev) => ({ ...prev, SkillsReq: [...prev.SkillsReq, skill] }));
    }
  };

  const handleJobDescriptionChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);
    if (words.length <= 500) {
      setFields((prev) => ({ ...prev, JobDescription: value }));
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    setFields((prev) => ({ ...prev, SkillsReq: updatedSkills }));
  };

  const handleCitySelect = (e) => {
    const city = e.target.value;
    if (city && !selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };

    if (!value) {
      tempErrors[name] = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else if (
      ["Salary", "Vacancy", "Experience"].includes(name) &&
      value < 0
    ) {
      tempErrors[
        name
      ] = `Invalid ${name.toLowerCase()}, please enter a positive value`
    } else {
      delete tempErrors[name]; // Remove error if input is valid
    }

    setErrors(tempErrors);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:3000/hr/postjob",
        fields, // Sending job post data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${token}`, // Attach token for authentication
          },
        }
      );

      alert("Job posted successfully!");
      setFields(initialFields); // Reset form after successful post
    } catch (error) {
      console.error("Error posting job:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while posting the job."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl font-sans">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create a Job Post
      </h3>
      <form>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="Title"
              value={fields.Title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Job Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Title && (
              <p className="text-red-500 text-sm">{errors.Title}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="CompanyName"
              value={fields.CompanyName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.CompanyName && (
              <p className="text-red-500 text-sm">{errors.CompanyName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Job Type
            </label>
            <select
              name="JobType"
              value={fields.JobType}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.JobType && (
              <p className="text-red-500 text-sm">{errors.JobType}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Job Description
            </label>
            <div className="relative">
              <textarea
                name="JobDescription"
                value={fields.JobDescription}
                onChange={handleJobDescriptionChange}
                onBlur={handleBlur}
                placeholder="Enter job description"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute bottom-2 right-2 text-gray-500 text-sm">
                {fields.JobDescription.trim().split(/\s+/).length}/500 words
              </span>
            </div>
            {errors.JobDescription && (
              <p className="text-red-500 text-sm">{errors.JobDescription}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Skills Required
            </label>
            <select
              name="SkillsReq"
              onChange={handleSkillChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Skill</option>
              {Skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.SkillsReq && (
              <p className="text-red-500 text-sm">{errors.SkillsReq}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Job Location
            </label>
            <select
              onChange={handleCitySelect}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Location</option>
              {Cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCities.map((city, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full"
                >
                  {city}
                  <button
                    onClick={() => removeCity(city)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Salary Offered
            </label>
            <input
              type="number"
              name="Salary"
              value={fields.Salary}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Salary"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Salary && (
              <p className="text-red-500 text-sm">{errors.Salary}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vacancy
            </label>
            <input
              type="number"
              name="Vacancy"
              value={fields.Vacancy}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Open Positions"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Vacancy && (
              <p className="text-red-500 text-sm">{errors.Vacancy}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Experience Required
            </label>
            <input
              type="number"
              name="Experience"
              value={fields.Experience}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Experience"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Experience && (
              <p className="text-red-500 text-sm">{errors.Experience}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Date to Apply
            </label>
            <input
              type="date"
              name="lastDate"
              value={fields.lastDate}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Experience"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastDate && (
              <p className="text-red-500 text-sm">{errors.lastDate}</p>
            )}
          </div>
          <button
            type="submit"
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;