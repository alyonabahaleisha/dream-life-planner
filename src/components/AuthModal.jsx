// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const GoogleIcon = () => (
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const AuthModal = ({ isOpen, setIsOpen, isSignIn, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setError('');
      setIsLoading(true);
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      onAuthSuccess(result.user);
      setIsOpen(false);
      
    } catch (error) {
      console.error('Google auth error:', error);
      setError(
        error.code === 'auth/popup-closed-by-user' ? 'Sign in was cancelled' :
        error.code === 'auth/popup-blocked' ? 'Please allow popups for this website' :
        'Failed to sign in with Google. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      let userCredential;
      if (isSignIn) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      onAuthSuccess(userCredential.user);
      setIsOpen(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Email auth error:', error);
      setError(
        error.code === 'auth/weak-password' ? 'Password should be at least 6 characters' :
        error.code === 'auth/email-already-in-use' ? 'Email already in use' :
        error.code === 'auth/invalid-email' ? 'Invalid email address' :
        error.code === 'auth/user-not-found' ? 'No account found with this email' :
        error.code === 'auth/wrong-password' ? 'Incorrect password' :
        'Failed to authenticate. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEmailAuth();
    }
  };

  const toggleMode = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isSignIn ? 'Welcome Back' : 'Start Your Journey'}</DialogTitle>
          <DialogDescription>
            {isSignIn ? 'Sign in to continue your journey' : 'Create an account to make your dream life a reality'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button 
            variant="outline" 
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="bg-white"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleEmailAuth}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Create Account')}
            </Button>

            <div className="text-center text-sm text-gray-500">
              {isSignIn ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;