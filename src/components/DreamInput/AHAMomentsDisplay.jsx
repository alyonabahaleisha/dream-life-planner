import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";

const AHAMomentsDisplay = ({ ahaMoments, onComplete }) => {
  const [currentAha, setCurrentAha] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  // Auto-advance AHA moments
  useEffect(() => {
    if (currentAha < ahaMoments.length - 1) {
      const timer = setTimeout(() => {
        setCurrentAha(prev => prev + 1);
      }, 7000); // 7 seconds per AHA moment
      return () => clearTimeout(timer);
    } else if (currentAha === ahaMoments.length - 1) {
      const timer = setTimeout(() => {
        setShowCTA(true);
      }, 7000); // 7 seconds for the last one too
      return () => clearTimeout(timer);
    }
  }, [currentAha, ahaMoments.length]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="min-h-[600px] flex flex-col items-center justify-center relative">
        {/* Progress dots */}
        <div className="absolute top-12 flex gap-3">
          {ahaMoments.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentAha ? 'bg-blue-500 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* AHA Moment Display */}
        <div className="text-center px-8 animate-fadeIn" key={currentAha}>
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            AHA #{currentAha + 1}
          </div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {ahaMoments[currentAha]}
          </h2>
        </div>

        {/* Progress bar */}
        {currentAha < ahaMoments.length - 1 && (
          <div className="absolute bottom-24 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"
              style={{ animationDuration: '7s' }}
            />
          </div>
        )}

        {/* CTA Button */}
        {showCTA && (
          <div className="absolute bottom-12 animate-fadeIn">
            <Button
              onClick={onComplete}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              📖 Read Your Full Story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AHAMomentsDisplay;