// src/UserProfile.js
import React, { useEffect, useState } from 'react';
// import defaultAvatar from ''; // Import default avatar

import { userData } from '../../../data/demoData';

const UserProfile = () => {
  const [user, setUser ] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    
    // Check if the uploaded file is a resume
    if (event.target.id === 'resumeInput') {
        setResumePreview(URL.createObjectURL(selectedFile));
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    resume: '',
    skills: [],
    profilePic: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const Data = async () => {
      const userData = await import('../../../data/demoData').then(module => module.userData[0]);
      setUser (userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        resume: userData.resume || '',
        skills: userData.skills || [],
        profilePic: userData.profilePic || '',
      });
    };

    Data();
  }, []);

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

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: value.split(',').map(skill => skill.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Start loading

    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('email', formData.email);
    dataToSend.append('password', formData.password);
    dataToSend.append('skills', formData.skills.join(','));
    dataToSend.append('profilePic', formData.profilePic);

    // Append the file if it exists
    if (file) {
      dataToSend.append('resume', file);
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
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
    <div className="w-full max-w-screen-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
        <button
          onClick={handleEditClick}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Edit
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mr-4 shadow-md">
          {user && user.profilePic ? (
            <img src={URL.createObjectURL(file) || user.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img src='../../assets/defaultAvatar.jpg' alt="Avatar" className="w-full h-full object-cover" />// Show default avatar
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
              disabled={!isEditing}/>
            <label
              htmlFor="profilePicInput"
              className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isEditing ? 'Choose File' : 'View File'}
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'password'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
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
              className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isEditing ? 'Upload Resume' : 'View Resume'}
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
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
            disabled={!isEditing}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 hover:border-gray-400"
          />
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
