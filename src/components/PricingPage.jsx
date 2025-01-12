// src/components/PricingPage.jsx
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL;

const PricingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStartFreeTrial = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        navigate('/login', { state: { returnPath: '/pricing' } });
        return;
      }

      // Get ID token for authentication
      const idToken = await user.getIdToken();

      // Create checkout session
      const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
          'X-User-ID': user.uid  // Add user ID header
        },
        body: JSON.stringify({
          userId: user.uid,  // Include user ID in body as well
          email: user.email
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create checkout session');
      }

      if (!data.url) {
        throw new Error('No checkout URL received from server');
      }

      // Log success before redirect
      console.log('Successfully created checkout session');
      window.location.href = data.url;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError(error.message || 'Failed to start checkout process');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your journey to your dream life with our premium features
          </p>
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
                <div className="text-3xl font-bold">$0</div>
                <div className="text-sm text-gray-500">Forever free</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  One dream life scenario
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Basic visualization
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Simple daily schedule
                </li>
              </ul>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-blue-600">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg">
              Popular
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                <div className="text-3xl font-bold">$9.99</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Unlimited dream scenarios
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Advanced AI visualization
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Detailed action plans
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Progress tracking
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Priority support
                </li>
              </ul>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleStartFreeTrial}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Start Free Trial'
                )}
              </Button>
              
              <div className="text-xs text-center mt-4 text-gray-500">
                Cancel anytime. 7-day money-back guarantee
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <h3 className="text-lg font-medium mb-4">All Premium Features Include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="font-medium">Unlimited Dreams</div>
              <div className="text-sm">Create as many scenarios as you want</div>
            </div>
            <div className="p-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="font-medium">Advanced Planning</div>
              <div className="text-sm">Get detailed roadmaps and milestones</div>
            </div>
            <div className="p-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="font-medium">Priority Support</div>
              <div className="text-sm">Get help when you need it</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;