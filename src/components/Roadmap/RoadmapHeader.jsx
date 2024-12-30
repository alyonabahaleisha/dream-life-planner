// components/Roadmap/RoadmapHeader.jsx
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, Save, Download } from 'lucide-react';

const RoadmapHeader = ({ 
  onBack, 
  onSave, 
  onDownload, 
  isDownloadDisabled 
}) => {
  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-medium text-gray-900">
              Your Dream Life Roadmap
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onSave}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 gap-2"
              onClick={onDownload}
              disabled={isDownloadDisabled}
            >
              <Download className="w-4 h-4" />
              Download Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;