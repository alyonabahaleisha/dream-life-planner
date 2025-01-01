import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import dreamBg from '../assets/dream-bg.png';

const Layout = () => {
  const { user, signOut, handleAuthSuccess } = useAuth();

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${dreamBg})` }}
      />
      
      {/* Header with background blur */}
      <div className="sticky top-0 z-50">
        <Header 
          user={user} 
          onSignOut={signOut} 
          onAuthSuccess={handleAuthSuccess} 
        />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;