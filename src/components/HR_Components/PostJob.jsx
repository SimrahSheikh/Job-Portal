import React, { useEffect, useState } from "react";
import { Skills } from "../../../data/skills";
import { Cities } from "../../assets/cities";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "../../store/slice/HrSlice/jobSlice";

const initialFields = {
  CompanyName: "",
  Title: "",
  JobType: "",
  Location: [],
  JobDescription: "",
  Salary: "",
  Experience: "",
  SkillsReq: [],
  Vacancy: "",
  LastDate: "",
};

const PostJob = () => {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.jobs)||{};

  useEffect(() => {
    if (loading) {
      alert("Loading...");
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      console.error("Error posting job:", error);
      alert(error.response?.data?.message || "An error occurred while posting the job.");
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };

    let sanitizedValue = value;
    if (["Salary", "Vacancy", "Experience"].includes(name)) {
      if (value.trim() === "") {
        sanitizedValue = "";
      } else if (!isNaN(value) && Number(value) >= 0) {
        sanitizedValue = Number(value);
      } else {
        tempErrors[name] = `${name} must be a positive number`;
        return;
      }
    }

    if (name === "LastDate" && !/^\d{4}-\d{2}-\d{2}$/.test(sanitizedValue)) {
      tempErrors[name] = "Please select a valid date";
    } else {
      delete tempErrors[name];
    }

    setErrors(tempErrors);
    setFields((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      setFields((prev) => ({ ...prev, SkillsReq: updatedSkills }));
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
      const updatedCities = [...selectedCities, city];
      setSelectedCities(updatedCities);
      setFields((prev) => ({ ...prev, Location: updatedCities }));
    }
  };

  const removeCity = (city) => {
    const updatedCities = selectedCities.filter((c) => c !== city);
    setSelectedCities(updatedCities);
    setFields((prev) => ({ ...prev, Location: updatedCities }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };

    if (!value && value !== 0) {
      tempErrors[name] = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else if (["Salary", "Vacancy", "Experience"].includes(name)) {
      if (isNaN(value) || Number(value) < 0) {
        tempErrors[name] = `${name} must be a positive number`;
      } else {
        delete tempErrors[name];
      }
    }

    setErrors(tempErrors);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    Object.keys(fields).forEach((key) => {
      if ((!fields[key] || fields[key].length === 0) && key !== "SkillsReq" && key !== "Location") {
        tempErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (selectedSkills.length === 0) tempErrors["SkillsReq"] = "Please select at least one skill";
    if (selectedCities.length === 0) tempErrors["Location"] = "Please select at least one location";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.LastDate)) {
      tempErrors["LastDate"] = "Please select a valid date";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("auth-token");
    console.log(token);

    const jobData = {
      ...fields,
      SkillsReq: selectedSkills,
      Location: selectedCities,
    };
    console.log(jobData);

    dispatch(postJob(jobData));
    alert("Job posted successfully!");
    setFields(initialFields);
    setSelectedSkills([]);
    setSelectedCities([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
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
                  className="flex items-center bg-gray-200 text-slate-950 px-3 py-1 rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-gray-400 font-bold"
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
                  className="flex items-center bg-gray-200 text-slate-950 px-3 py-1 rounded-full"
                >
                  {city}
                  <button
                    onClick={() => removeCity(city)}
                    className="ml-2 text-gray-400 font-bold"
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
              name="LastDate"
              value={fields.LastDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.LastDate && (
              <p className="text-red-500 text-sm">{errors.LastDate}</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 "
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;