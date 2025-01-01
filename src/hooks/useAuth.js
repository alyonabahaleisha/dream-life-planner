import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence, 
  getRedirectResult,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Redirect successful:', result.user.email);
          setUser(result.user);
        }
      } catch (error) {
        console.error('Redirect error:', error);
      }
    };

    checkRedirect();
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setAuthInitialized(true);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error setting up auth:', error);
        setAuthInitialized(true);
      }
    };

    initialize();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      navigate('/'); // Redirect to root page after sign out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    authInitialized,
    handleAuthSuccess,
    signOut
  };
};