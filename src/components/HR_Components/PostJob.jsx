import React, { useState } from 'react';

const initialFields = {
    CompanyName: "",
    Title: "",
    JobType: "",
    Location: "",
    JobDescription: "",
    KeyResponsiblities: "",
    Salary: "",
    Experience: "",
    SkillsReq: "",
    JobRoles: "",
    JobOpenings: "",
};

const PostJob = () => {
    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Indore" , "Pan India"
    ];

    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let tempErrors = { ...errors };
        if (!value) {
            tempErrors[name] = `${name.replace(/([A-Z])/g, ' $1')} is required`;
        } else {
            delete tempErrors[name];
        }
        setErrors(tempErrors);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl font-sans">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create a Job Post</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input type="text" name="Title" value={fields.Title} onChange={handleChange} onBlur={handleBlur} placeholder="Job Title" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.Title && <p className="text-red-500 text-sm">{errors.Title}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                    <input type="text" name="CompanyName" value={fields.CompanyName} onChange={handleChange} onBlur={handleBlur} placeholder="Company Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.CompanyName && <p className="text-red-500 text-sm">{errors.CompanyName}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Job Type</label>
                    <select name="JobType" value={fields.JobType} onChange={handleChange} onBlur={handleBlur} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Internship">Internship</option>
                    </select>
                    {errors.JobType && <p className="text-red-500 text-sm">{errors.JobType}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Job Location</label>
                    <select name="Location" value={fields.Location} onChange={handleChange} onBlur={handleBlur} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Job Location</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.Location && <p className="text-red-500 text-sm">{errors.Location}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Salary Offered</label>
                    <input type="number" name="Salary" value={fields.Salary} onChange={handleChange} onBlur={handleBlur} placeholder="Salary" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.Salary && <p className="text-red-500 text-sm">{errors.Salary}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Number of Openings</label>
                    <input type="number" name="JobOpenings" value={fields.JobOpenings} onChange={handleChange} onBlur={handleBlur} placeholder="Open Positions" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.JobOpenings && <p className="text-red-500 text-sm">{errors.JobOpenings}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Experience Required</label>
                    <input type="number" name="Experience" value={fields.Experience} onChange={handleChange} onBlur={handleBlur} placeholder="Experience" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {errors.JobOpenings && <p className="text-red-500 text-sm">{errors.JobOpenings}</p>}
                </div>
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Upload</button>
            </div>
        </div>
    );
};

export default PostJob;