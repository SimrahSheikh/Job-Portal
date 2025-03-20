import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful</h2>
          <p className="mt-2 text-base text-gray-600">Thank you for your purchase!</p>
        </div>
        <div className="mt-8">
          <Link to="/user/jobs" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;