import React from "react";

const HrProfileLoading = () => {
  return (
    <div className="flex flex-col  items-center p-6 w-2xl  max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg bg-white animate-pulse">
      {/* Header Placeholder */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
      
      {/* Avatar Placeholder */}
      <div className="flex mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
        <div className="flex-1">
          <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      {/* Form Fields Placeholder */}
      <div className="space-y-4 w-full">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full">
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Buttons Placeholder */}
      <div className="flex space-x-4 mt-6">
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default HrProfileLoading;
