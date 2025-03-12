import React, { useEffect, useState } from 'react';
import StatusCard from '../../assets/statusCard.jsx';
import JobPageLoading from "../Loading/JobPageLoading";
import { UserAppliedJob } from '../../store/slice/userSlice/appliedJobSlice';
import { useDispatch, useSelector } from 'react-redux';

const AppliedJobs = () => {

  const dispatch = useDispatch();
  const { appliedJobs , loading, error } = useSelector((state) => state.appliedJobs);

  useEffect(() => {
    dispatch(UserAppliedJob());
  }, [dispatch]);

  if (loading) {
    return <JobPageLoading />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p className="text-center">No applied jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appliedJobs.map((job) => (
            <StatusCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
