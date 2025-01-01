import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import UserAvatar from './UserAvatar';

const Header = ({ user, onSignOut, onAuthSuccess }) => {
  return (
    <div className="absolute top-0 left-0 w-full z-10 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/dream-life-planner/icon.png" 
            alt="Dream Life Planner" 
            className="w-8 h-8" 
          />
          <span className="text-xl font-medium text-gray-800">
            Dream Life Planner
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <UserAvatar user={user} onSignOut={onSignOut} />
          ) : (
            <AuthButtons onAuthSuccess={onAuthSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;