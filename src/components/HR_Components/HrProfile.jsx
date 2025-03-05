import React, { useState } from 'react';


const AdminComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        companyName: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [resumePreview, setResumePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResumePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Optionally reset form data or handle cancel logic
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Admin Profile</h2>
                <button
                    onClick={handleEditClick}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mr-4 shadow-md">
                    {file ? (
                        <img src={URL.createObjectURL(file)} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <img src='../../assets/defaultAvatar.jpg' alt="Avatar" className="w-full h-full object-cover" />
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
                            className={`cursor-pointer inline-block bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-700 ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isEditing ? 'Choose File' : 'View File'}
                        </label>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'email', 'password', 'phoneNumber', 'companyName'].map((field) => (
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

                {isEditing && (
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"                       onClick={handleCancelClick}
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