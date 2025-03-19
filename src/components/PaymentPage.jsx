import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Breadcrumbs from './User_Components/Breadcrumbs';

// Load your publishable key from Stripe
const stripePromise = loadStripe("pk_test_51R2tsUQXyCFGQiCOE36zlvWw5vmhTOv1Vxd6CtsE4ixFupH9UVYmnr9NAtZ2MjFUIuSU2efEJNRXMOedPjnShrjD00WL90liLi");

const PaymentPage = () => {
  const { plan } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-y-hidden">
        <div className="flex min-h-screen">
          {/* Left Section */}
          <div className="w-1/2 bg-gray-100 p-10 flex flex-col justify-top">
            <div>
              <Breadcrumbs Title='PaymentPage' NavLink='/premium' Name='Premiums'/>
            </div>
            <h2 className="text-4xl font-bold mt-4">Subscribe to {plan}</h2>
            <p className="text-3xl mt-2">{plan === 'Premium' ? '$9' : '$19'} <span className="text-lg">per month</span></p>
            <p className="mt-2 text-gray-600">"Congratulations, You are subscribed with {plan} Plan"</p>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-white p-10 flex flex-col justify-center shadow-lg">
            <CheckoutForm plan={plan} />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;