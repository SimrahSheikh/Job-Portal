// src/UserProfile.js
import React, { useEffect, useState } from "react";
// import defaultAvatar from ''; // Import default avatar

// import { userData } from "../../../data/demoData";
import { Skills } from "../../../data/skills";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Check if the uploaded file is a resume
    if (event.target.id === "resumeInput") {
      setResumePreview(URL.createObjectURL(selectedFile));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
  email: "",
  password: "",
  resume: "",
  skills: [],
  profilePic: "",
  phone: "",
  countryCode: "+1",
  experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const id = "67bd681b916e3979a3e12d8e"

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Start loading
  //     const response = await axios.get(`./user/profile/${id}`)
  //     .then(
  //       (response) => {
  //         setFormData(response.data);
  //         setLoading(false); // Stop loading after data is set
  //       }
  //     );
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`http://localhost:3000/user/profile/${id}`);
        setUser(response.data); // Save the full user object
        setFormData(response.data); // Populate the form
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]); // Add `id` dependency to ensure fetching happens properly  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user); // Reset form data to the original user data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      setFormData((prev) => ({ ...prev, skills: updatedSkills }));
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Start loading

    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    const dataToSend = new FormData(); // Prepare data for submission and log it
    // console.log("Data to send:", dataToSend);


    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("phone", user.phone);
    dataToSend.append("skills", formData.skills.join(","));
    dataToSend.append("experience", user.experience);
    dataToSend.append("profilePic", formData.profilePic);

    // console.log([...formData.entries()])
    // console.log([...formData.entries()])  


    // Append the file if it exists
    if (file) {
      dataToSend.append("resume", file);
    }

    try {
      const response = await fetch(`http://localhost:3000/user/profile/${id}`, { // Updated endpoint
        method: "PUT",
        body: dataToSend,
      });

      if (!response.ok) { // Check if the response is not okay
        console.error("Response error:", response);

        throw new Error("Failed to update user data");
      }

      setUser(formData);
      setLoading(false); // Stop loading

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading... Please wait.</div>;

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {formData.name}
        </h2>
        <button
          onClick={handleEditClick}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Edit
        </button>
      </div>

      <form className="space-y-4" >
        {/* Avatar Section */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mr-4 shadow-md">
            {user && user.profilePic ? (
              <img
                src={URL.createObjectURL(file) || user.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="../../assets/defaultAvatar.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              /> // Show default avatar
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Upload New Profile Picture
            </label>
            <div className="mt-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profilePicInput"
                disabled={!isEditing}
              />
              <label
                htmlFor="profilePicInput"
                className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isEditing ? "Choose File" : "View File"}
              </label>
            </div>
          </div>
        </div>

        {["name", "email", "password" , "phone" , "experience"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 hover:border-gray-400"
              pattern={field === "phone" ? "^\\d{10}$" : undefined} // Regex for exactly 10-digit phone number
              title={field === "phone" ? "Please enter a valid 10-digit phone number." : ""}
              maxLength={field === "phone" ? 10 : undefined} // Ensure max length of 10
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume
          </label>
          <div className="mt-1">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="resumeInput"
              disabled={!isEditing}
            />
            <label
              htmlFor="resumeInput"
              className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
                {isEditing ? "Upload Resume" : "View Resume"} {/* Display appropriate label */}

            </label>
            {resumePreview && (
              <div className="mt-2">
                <a
                  href={resumePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View Uploaded Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* {isEditing && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Skills
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
          </div> */}
           <div>
          <label className="block text-gray-700 font-medium mb-1">
            Skills
          </label>
          {isEditing ? (
            <>
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
            </>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills && formData.skills.length > 0 ? (
                formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-slate-950 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No skills added</p>
              )}
            </div>
        )}
        </div>

        {isEditing && (
          <div className="flex space-x-4">
            <button
              type="button" // Change to button to prevent default form submission

              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
