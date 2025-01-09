import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export const withAuthProtection = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate('/login');
        }
      });

      // Initial check
      if (!auth.currentUser) {
        navigate('/login');
      }

      return () => unsubscribe();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};