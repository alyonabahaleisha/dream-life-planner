import React from 'react';
import { Button } from './ui/button';
import { Sparkles, Palette } from 'lucide-react';

const ImageModelToggle = ({ model, onToggle }) => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1">
      <Button
        variant={model === 'dalle' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onToggle('dalle')}
        className="flex items-center gap-2"
      >
        <Sparkles className="h-4 w-4" />
        DALL·E
      </Button>
      <Button
        variant={model === 'stability' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onToggle('stability')}
        className="flex items-center gap-2"
      >
        <Palette className="h-4 w-4" />
        Stability AI
      </Button>
    </div>
  );
};

export default ImageModelToggle;