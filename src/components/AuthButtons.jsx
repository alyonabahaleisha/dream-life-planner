// src/components/AuthComponents.jsx
import React, { useState } from 'react';
import { Button } from "./ui/button";
import AuthModal from './AuthModal';
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

// Shared authentication logic component
const useAuth = (onAuthSuccess) => {
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
      return true;
      
    } catch (error) {
      console.error('Google auth error:', error);
      setError(
        error.code === 'auth/popup-closed-by-user' ? 'Sign in was cancelled' :
        error.code === 'auth/popup-blocked' ? 'Please allow popups for this website' :
        'Failed to sign in with Google. Please try again.'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (isSignIn) => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
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
      setEmail('');
      setPassword('');
      return true;
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
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleGoogleAuth,
    handleEmailAuth
  };
};

// AuthButtons Component
const AuthButtons = ({ onAuthSuccess }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost"
        size="sm"
        onClick={() => setIsSignInOpen(true)}
        className="text-sm px-3 py-1 h-7 font-light"
      >
        Sign In
      </Button>
      <Button 
        variant="default"
        size="sm"
        onClick={() => setIsSignUpOpen(true)}
        className="text-sm px-3 py-1 h-7 bg-[#205eb4] hover:bg-[#205eb4]/90 font-light"
      >
        Sign Up
      </Button>

      <AuthModal 
        isOpen={isSignInOpen} 
        setIsOpen={setIsSignInOpen} 
        isSignIn={true}
        onAuthSuccess={onAuthSuccess}
      />
      <AuthModal 
        isOpen={isSignUpOpen} 
        setIsOpen={setIsSignUpOpen} 
        isSignIn={false}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  );
};

export default AuthButtons;