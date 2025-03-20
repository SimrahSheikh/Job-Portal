import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ plan }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        email: '',
        address: {
            line1: '',
            city: '',
            state: '',
            postal_code: '',
        }
    });
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const token = localStorage.getItem("auth-token");

    useEffect(() => {
        // Fetch saved cards from the backend
        const fetchSavedCards = async () => {
            try {
                const response = await axios.get('http://localhost:3000/stripe/saved-cards', {
                    headers: {
                        "authorization-user": 'Bearer ' + token,
                    }
                });
                console.log('Saved Cards:', response.data);
                setSavedCards(response.data);
            } catch (err) {
                console.error('Error fetching saved cards:', err);
            }
        };

        fetchSavedCards();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        let paymentMethodId;

        if (selectedCard) {
            paymentMethodId = selectedCard;
        } else {
            const cardElement = elements.getElement(CardNumberElement);
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            });

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            paymentMethodId = paymentMethod.id;

            // Attach the payment method to the customer
            // try {
            //     await axios.post('http://localhost:3000/stripe/attach-payment-method', {
            //         paymentMethodId,
            //     });
            // } catch (err) {
            //     console.error('Error attaching payment method:', err);
            //     setError('Failed to attach payment method');
            //     setLoading(false);
            //     return;
            // }
        }

        try {
            const response = await axios.post('http://localhost:3000/stripe/create-subscription', {
                billingDetails,
                paymentMethodId,
                plan,
            },
                {
                    headers: {
                        "authorization-user": 'Bearer ' + token,
                    }
                });

            // Handle response from your backend
            console.log('Subscription:', response.data);
            navigate('/payment-success');
        } catch (err) {
            console.error('Error creating subscription:', err);
            setError('Failed to create subscription');
        }

        setLoading(false);
    };

    const handleInputChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value
        });
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#374151',
                '::placeholder': {
                    color: '#9CA3AF',
                },
            },
            invalid: {
                color: '#EF4444',
            },
        },
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto md:mx-0 md:ml-auto md:mr-8 lg:mr-16">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Information</h2>
                <p className="text-gray-600">Enter your payment details to continue</p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-6">
                {savedCards.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            💳 Saved Cards
                        </label>
                        <select
                            value={selectedCard}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">Select a saved card</option>
                            {savedCards.map((card) => (
                                <option key={card.id} value={card.id}>
                                    {card.card.brand} ending in {card.card.last4}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
    
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowNewCardForm(!showNewCardForm)}
                            className="bg-white px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 rounded-full border border-gray-300 hover:border-indigo-400 transition-all"
                        >
                            {showNewCardForm ? 'Use Saved Card' : 'Add New Card'}
                        </button>
                    </div>
                </div>
    
                {showNewCardForm && (
                    <>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={billingDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
    
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Details
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-indigo-500">
                                        <CardNumberElement options={cardElementOptions} />
                                    </div>
                                </div>
    
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-indigo-500">
                                            <CardExpiryElement options={cardElementOptions} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-indigo-500">
                                            <CardCvcElement options={cardElementOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={billingDetails.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
    
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postal_code"
                                        value={billingDetails.address.postal_code}
                                        onChange={(e) => setBillingDetails({
                                            ...billingDetails,
                                            address: {
                                                ...billingDetails.address,
                                                postal_code: e.target.value
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="12345"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
    
                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
                )}
    
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        `${plan === 'Premium' ? 'Pay $99.00' : 'Pay $199.00'}`
                    )}
                </button>
            </form>
    
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center space-y-3">
                    <span className="text-sm text-gray-500">Secure and encrypted payments</span>
                    <div className="flex space-x-4">
                        <img src="/visa.svg" alt="Visa" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                        <img src="/mastercard.svg" alt="Mastercard" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                        <img src="/amex.svg" alt="American Express" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                        <img src="/lock.svg" alt="Security" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;