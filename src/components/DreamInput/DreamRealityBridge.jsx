import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";

const DreamRealityBridge = ({ dreamData, onContinue }) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    // Staged animation
    const timers = [
      setTimeout(() => setAnimationStage(1), 500),  // Dream side appears
      setTimeout(() => setAnimationStage(2), 1500), // Reality side appears
      setTimeout(() => setAnimationStage(3), 2500), // Bridge appears
      setTimeout(() => setAnimationStage(4), 3500), // Text appears
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-50 via-white to-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Visual Bridge Metaphor */}
        <div className="relative h-64 mb-12">
          {/* Dream Side */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-1000 ${
            animationStage >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-white text-center">
                <div className="text-3xl mb-1">✨</div>
                <div className="text-xs font-medium">Dream</div>
              </div>
            </div>
          </div>
          
          {/* Reality Side */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-1000 ${
            animationStage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-white text-center">
                <div className="text-3xl mb-1">🎯</div>
                <div className="text-xs font-medium">Reality</div>
              </div>
            </div>
          </div>
          
          {/* Bridge */}
          <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-20 transition-all duration-1000 ${
            animationStage >= 3 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="relative h-1 bg-gradient-to-r from-purple-400 via-gray-300 to-gray-700">
              {/* Bridge pillars */}
              <div className="absolute left-1/4 -top-4 w-0.5 h-8 bg-gray-400"></div>
              <div className="absolute left-1/2 -top-4 w-0.5 h-8 bg-gray-500"></div>
              <div className="absolute left-3/4 -top-4 w-0.5 h-8 bg-gray-600"></div>
              
              {/* Walking figure */}
              <div className={`absolute top-0 transition-all duration-3000 ${
                animationStage >= 4 ? 'left-1/2' : 'left-0'
              }`}>
                <div className="w-2 h-2 bg-white rounded-full -mt-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className={`text-center transition-all duration-1000 ${
          animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-gray-800 bg-clip-text text-transparent">
            Building Your Bridge from Dream to Reality
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The Universe showed you what's possible. Now let's map out where you are today 
            so we can build the perfect path to get you there.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-2xl">🎭</span>
              </div>
              <p className="text-sm text-gray-600">Your Vision</p>
              <p className="text-xs text-gray-500">Captured</p>
            </div>
            
            <div className="text-gray-400">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-2xl">📍</span>
              </div>
              <p className="text-sm text-gray-600">Your Starting Point</p>
              <p className="text-xs text-gray-500">Let's Map It</p>
            </div>
            
            <div className="text-gray-400">→</div>
            
            <div className="text-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-2xl">🗺️</span>
              </div>
              <p className="text-sm text-gray-600">Your Roadmap</p>
              <p className="text-xs text-gray-500">Coming Next</p>
            </div>
          </div>
          
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-600 to-gray-800 text-white px-8 py-3 rounded-lg text-lg hover:shadow-lg transition-all duration-300"
          >
            Start Mapping My Journey
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            5-minute assessment • Personalized questions • No right or wrong answers
          </p>
        </div>
      </div>
    </div>
  );
};

export default DreamRealityBridge;