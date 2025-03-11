import React from 'react';

function JobPageLoading() {
  const loadingSkeletons = Array(9).fill(0);

  return (<>
  <div className='h-[15%] w-full  rounded-lg flex justify-center items-center animate-pulse'>
<div className='bg-gray-400 px-4 py-5 rounded-2xl w-[25%]'> </div>
  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loadingSkeletons.map((_, index) => (
        <div key={index} className="max-w-sm p-5 bg-white shadow-lg rounded-2xl border border-gray-400 animate-pulse">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white rounded-full font-bold"></div>
          {/* Company Name and Date */}
          <div className='flex w-full space-x-3'>
            <div className="bg-gray-400 text-sm mt-3 rounded-lg p-1 w-1/3"></div>
            <div className="bg-gray-300 text-sm mt-3 rounded-lg p-1 w-1/3"></div>
          </div>
          {/* Job Title */}
          <div className="text-xl font-semibold mt-2 p-2 w-full bg-gray-400 rounded-lg"></div>
          {/* Job Tags */}
          <div className="flex gap-2 mt-3">
            <span className="text-sm bg-gray-200 rounded-lg px-1 py-2 w-[15%]"></span>
            <span className="text-sm bg-gray-200 rounded-lg px-1 py-2 w-[15%]"></span>
          </div>
          {/* Salary & Location */}
          <div className="text-lg font-semibold mt-4 bg-gray-300 w-[80%] p-2 rounded-lg"></div>
          <div className="bg-gray-200 text-sm p-1 rounded-lg mt-2 w-[30%]"></div>
          {/* Apply Button */}
          <div className='mt-4 w-full bg-gray-400 text-white py-4 rounded-lg text-center'></div>
        </div>
      ))}
    </div></>
  );
}

export default JobPageLoading;
