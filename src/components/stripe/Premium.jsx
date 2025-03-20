import React from 'react';
import { useNavigate } from 'react-router-dom';

function Premium() {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate(`/payment/${plan}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Choose Your Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Free</h2>
              <div className="mb-8">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access to basic job listings
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  5 application submissions/month
                </li>
              </ul>
              <button className="w-full mt-8 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50">
                Get Started
              </button>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="bg-blue-50 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">Premium</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-blue-800">$9</span>
                <span className="text-gray-600">/month</span>
                <p className="text-sm text-gray-500 mt-1">Billed annually ($99)</p>
              </div>
              <ul className="space-y-4">
                {['Access to all job listings', 'Unlimited applications', 'Priority support', 'Advanced search filters'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe('Premium')}
                className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Subscribe to Premium
              </button>
            </div>
          </div>

          {/* Premium+ Tier */}
          <div className="bg-purple-50 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Premium+</h2>
              <div className="mb-8">
                <span className="text-4xl font-bold text-purple-800">$19</span>
                <span className="text-gray-600">/month</span>
                <p className="text-sm text-gray-500 mt-1">Billed annually ($199)</p>
              </div>
              <ul className="space-y-4">
                {['All Premium features', 'Personalized job recommendations', 'Resume review', 'Career coaching', 'Exclusive webinars'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe('Premium+')}
                className="w-full mt-8 px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700"
              >
                Subscribe to Premium+
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>All plans come with a 14-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
}

export default Premium;
