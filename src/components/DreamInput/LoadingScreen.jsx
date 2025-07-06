import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = ({ message = "Crafting your breakthrough moments..." }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <Sparkles className="h-12 w-12 text-blue-500 mx-auto animate-pulse" />
          </div>
          <h2 className="text-2xl font-light text-gray-800 mb-2">
            {message}
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;