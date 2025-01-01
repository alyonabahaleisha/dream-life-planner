import React, { useState } from 'react';
import { useDevSettings } from '../../hooks/useDevSettings';
import { Wrench } from 'lucide-react';

const DevToolbar = () => {
  const { useMockApi, setUseMockApi } = useDevSettings();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setUseMockApi(!useMockApi);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 cursor-pointer transition-all z-50 hover:h-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleToggle}
    >
      {isHovered && (
        <div className="h-full flex items-center justify-center gap-2 text-xs text-gray-600">
          <Wrench className="w-3 h-3" />
          <span>API Mode: {useMockApi ? 'Mocks' : 'Real'}</span>
        </div>
      )}
    </div>
  );
};

export default DevToolbar;