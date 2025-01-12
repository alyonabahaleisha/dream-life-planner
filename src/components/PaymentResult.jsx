// src/components/PaymentResult.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PaymentResult = ({ status = 'success' }) => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (status === 'success') {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
          try {
            // You might want to verify the session with your backend here
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate verification
            setIsVerifying(false);
          } catch (error) {
            console.error('Error verifying payment:', error);
            navigate('/pricing');
          }
        }
      } else {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [status, searchParams, navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-lg text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        {status === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Welcome to Premium! You now have access to all premium features.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Payment Cancelled
            </h1>
            <p className="text-gray-600">
              Your payment was cancelled. No charges were made.
            </p>
          </>
        )}

        <div className="pt-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;