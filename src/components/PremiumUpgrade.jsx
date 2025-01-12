import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';
import { auth } from '../config/firebase';

// Only public key on frontend
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const API_URL = import.meta.env.VITE_API_URL;

const PremiumUpgrade = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        navigate('/login', { state: { returnPath: '/premium' } });
        return;
      }

      // Get ID token for authentication
      const idToken = await user.getIdToken();

      // Create checkout session
      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe redirect error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-semibold mb-2">Upgrade to Premium</div>
      <p className="text-gray-600">Get unlimited access to all features</p>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 my-6">
        <div className="text-3xl font-bold text-blue-600 mb-2">$9.99</div>
        <div className="text-sm text-gray-600">per month</div>
      </div>
      
      <ul className="space-y-3 text-left text-gray-600 mb-6">
        <li className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          Unlimited dream scenarios
        </li>
        <li className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          Detailed action plans
        </li>
        <li className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          Priority support
        </li>
      </ul>

      <Button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2Icon className="w-4 h-4 animate-spin" />
            Processing...
          </div>
        ) : (
          'Upgrade Now'
        )}
      </Button>
      
      <p className="text-xs text-gray-500 mt-4">
        Cancel anytime. All payments are processed securely through Stripe.
      </p>
    </div>
  );
};

export default PremiumUpgrade;