import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const DashboardHeader = ({ dreamSummary }) => {
  const navigate = useNavigate();
  
  // Create a short version of the dream for the header
  const shortDream = dreamSummary.length > 60 
    ? dreamSummary.substring(0, 60) + '...' 
    : dreamSummary;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Your Dream Blueprint</h1>
              <p className="text-sm text-gray-600 mt-1">{shortDream}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;