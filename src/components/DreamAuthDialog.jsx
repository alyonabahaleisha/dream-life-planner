// src/components/DreamAuthDialog.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Sparkles, Rocket, Target, ArrowRight, Gift, Star } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const features = [
  {
    icon: Target,
    title: "Personalized Roadmap",
    description: "Get a detailed plan tailored to your unique dreams and goals"
  },
  {
    icon: Rocket,
    title: "Track Progress",
    description: "Monitor your journey with interactive milestones"
  },
  {
    icon: Gift,
    title: "Exclusive Resources",
    description: "Access curated tools and guidance for success"
  },
  {
    icon: Star,
    title: "Expert Support",
    description: "Receive personalized coaching and feedback"
  }
];

const DreamAuthDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = (type) => {
    onClose();
    navigate('/assessment', { 
      state: { 
        showSignUp: type === 'signup',
        showSignIn: type === 'signin'
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        {/* Header with Gradient Background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10" />
          <DialogHeader className="p-6">
            <div className="text-center space-y-2 relative">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <DialogTitle className="text-2xl">Begin Your Journey</DialogTitle>
              <p className="text-gray-600">
                Create your free account to unlock your personalized roadmap to success
              </p>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid gap-6">
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full bg-white hover:bg-gray-50 border shadow-sm text-gray-600 hover:text-gray-700 font-normal h-12"
                onClick={() => handleContinue('signup')}
              >
                <GoogleIcon />
                <span className="ml-2">Continue with Google</span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 gap-2 text-base font-medium"
                onClick={() => handleContinue('signup')}
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={() => handleContinue('signin')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-center text-gray-500 mt-6">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DreamAuthDialog;