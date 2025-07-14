import React from 'react';
import { Download, Play, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

const DashboardActions = ({ onSave, onStart, onShare }) => {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
      <Button
        onClick={onStart}
        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg shadow-lg"
      >
        <Play className="w-5 h-5 mr-2" />
        Start My Journey
      </Button>
      
      <Button
        onClick={onSave}
        variant="outline"
        className="px-6 py-3"
      >
        <Download className="w-4 h-4 mr-2" />
        Save Blueprint
      </Button>
      
      {onShare && (
        <Button
          onClick={onShare}
          variant="outline"
          className="px-6 py-3"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      )}
    </div>
  );
};

export default DashboardActions;