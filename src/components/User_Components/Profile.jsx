// src/UserProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilePic from "../../assets/defaultAvatar.png";
import { Skills } from "../../../data/skills";
import UserProfileLoading from "../Loading/UserProfileLoading";
const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    resume: "",
    skills: [],
    profilePic: "",
    phoneNumber: "",
    countryCode: "+1",
    experience: "",
  });
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const token = localStorage.getItem("auth-token");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (event.target.id === "resumeInput") {
      setFormData((prev) => ({ ...prev, resume: selectedFile }));
      setResumePreview(URL.createObjectURL(selectedFile));
    } else if (event.target.id === "profilePicInput") {
      setFormData((prev) => ({ ...prev, profilePic: selectedFile }));
      setFile(selectedFile); // Ensure file object is stored
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/user/profile`, {
          headers: {
            "authorization-user": `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setUser(response.data);
        setFormData(response.data);
        setSelectedSkills(response.data.skills);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);    
      }
    };

    fetchData();
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user);
    setResumePreview(null); // Clear resume preview on cancel
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

  const handleValidate = (e) => {
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError("A valid 10-digit phone number is required.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    const dataSend = new FormData();
    dataSend.append("name", formData.name);
    dataSend.append("email", formData.email);
    dataSend.append("phoneNumber", formData.phoneNumber);
    dataSend.append("experience", formData.experience);
    selectedSkills.forEach((skill) => dataSend.append("skills[]", skill));

    if (formData.profilePic instanceof File) {
      dataSend.append("profilePic", formData.profilePic);
    }
    if (formData.resume instanceof File) {
      dataSend.append("resume", formData.resume);
    }

    try {
      const response = await axios.put(`http://localhost:3000/user/upProfile`, dataSend, {
        headers: {
          "authorization-user": `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user data:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><UserProfileLoading/></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
        <button
          onClick={handleEditClick}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Edit
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleValidate}>
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mr-4 shadow-md">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Profile" className="w-full h-full object-cover" />
            ) : user && user.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src={ProfilePic} alt="Avatar" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Upload New Profile Picture</label>
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
                className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isEditing ? "Choose File" : "View File"}
              </label>
            </div>
          </div>
        </div>

        {["name", "email", "password", "phoneNumber", "experience"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 hover:border-gray-400"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Resume</label>
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
              className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isEditing ? "Upload Resume" : "View Resume"}
            </label>
            {resumePreview && (
              <div className="mt-2">
                <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  View Uploaded Resume
                </a>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Skills</label>
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
                  <div key={index} className="flex items-center bg-gray-200 text-slate-950 px-3 py-1 rounded-full">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 font-bold">
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
                  <div key={index} className="bg-gray-200 text-slate-950 px-3 py-1 rounded-full">
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
              type="submit"
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
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
