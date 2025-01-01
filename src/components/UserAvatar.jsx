import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  LogOut,
  CreditCard,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const UserAvatar = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('system');
  
  // Get email username for display
  const getDisplayName = (email) => {
    return email.split('@')[0].replace(/[._]/g, '-');
  };

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 px-3 py-2 hover:bg-transparent"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden ring-2 ring-white/80 hover:ring-4 hover:ring-white/50 transition-all">
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/shapes/svg`}
              alt="User avatar"
              className="h-8 w-8 rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer focus:bg-gray-100"
          onClick={() => navigate('/billing')}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          className="cursor-pointer focus:bg-gray-100"
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <div className="text-sm mb-2">Language</div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
          >
            English
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <Button 
            variant="default"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Upgrade Plan
          </Button>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer focus:bg-gray-100 text-red-600 focus:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;