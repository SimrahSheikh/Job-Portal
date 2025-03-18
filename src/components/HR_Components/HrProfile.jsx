import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "../../assets/defaultAvatar.png";
import HrProfileLoading from "../Loading/HrProfileLoading";

const AdminComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    profilePic: "",
  });
  const [hr, sethr] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth-token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (e.target.id === "profilePicInput") {
      setFormData((prev) => ({ ...prev, profilePic: selectedFile })); // Set the file object
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/hr/profile`, {
          headers: {
            "authorization-user": `Bearer ${token}`,
          },
        });
        sethr(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(hr);
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
    setError(null); 

    const dataSend = new FormData();
    dataSend.append("name", formData.name);
    dataSend.append("email", formData.email);
    dataSend.append("phone", formData.phone);
    if (formData.password) {
      dataSend.append("password", formData.password); // Only send if password is updated
    }
    // if (formData.password.trim() !== "") {
    //   dataSend.append("password", formData.password);
    // }
    dataSend.append("companyName", formData.companyName);
    dataSend.append("profilePic", formData.profilePic); // This should be a file object

    try {
      const response = await axios.put(
        `http://localhost:3000/hr/upProfile`,
        dataSend,
        {
          headers: {
            "authorization-user": `Bearer ${token}`,
          },
        }
      );
      sethr(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error(
        "Error updating data:",
        err.response ? err.response.data : err.message
      );
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><HrProfileLoading/></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {formData.name}
        </h2>
        <button
          onClick={handleEditClick}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mr-4 shadow-md">
          {hr && hr.ProfilePath ? (
            <img
              src={file ? URL.createObjectURL(file) : hr.ProfilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={ProfilePic}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
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
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFormData((prev) => ({
                  ...prev,
                  profilePic: URL.createObjectURL(selectedFile),
                }));
              }}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phoneNumber", "companyName"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 hover:border-gray-400"
              />
            </div>
          )
        )}

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

export default AdminComponent;