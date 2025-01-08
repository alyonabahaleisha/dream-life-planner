import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const withAuthProtection = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const checkAuth = () => {
        try {
          const user = localStorage.getItem('user');
          console.log('user : ', user);
          if (!user) {
            navigate('/login');
            return false;
          }
          return true;
        } catch (error) {
          console.error('Error checking authentication:', error);
          navigate('/login');
          return false;
        }
      };

      const isAuthenticated = checkAuth();
      console.log('isAuthenticated >>>', isAuthenticated);
      if (!isAuthenticated) {
        return;
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};