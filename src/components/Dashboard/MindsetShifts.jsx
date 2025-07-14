import React, { useState } from 'react';
import { ArrowRight, Brain, Lightbulb, RefreshCw } from 'lucide-react';

const MindsetShifts = ({ shifts = [] }) => {
  const [currentShift, setCurrentShift] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!shifts || shifts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No mindset shifts available
      </div>
    );
  }

  const handleNext = () => {
    setFlipped(false);
    setCurrentShift((prev) => (prev + 1) % shifts.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentShift((prev) => (prev - 1 + shifts.length) % shifts.length);
  };

  const shift = shifts[currentShift];

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Transform Your Thinking</h2>
      <p className="text-gray-600 mb-8">Master these mental shifts to unlock your potential</p>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {shifts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentShift(index);
              setFlipped(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentShift
                ? 'bg-purple-600 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Mindset Card */}
      <div className="max-w-2xl mx-auto">
        <div className="relative h-[400px] mb-6">
          {/* Card Container */}
          <div
            className={`absolute inset-0 transition-all duration-700 transform-gpu ${
              flipped ? 'rotate-y-180' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Front of Card - FROM state */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg p-8 flex flex-col justify-center backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">😔</span>
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-4">Old Limiting Belief</h3>
                <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                  "{shift.from}"
                </p>
              </div>
            </div>

            {/* Back of Card - TO state */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg p-8 flex flex-col justify-center rotate-y-180 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-lg font-medium mb-4">Empowering New Belief</h3>
                <p className="text-2xl font-bold leading-relaxed">
                  "{shift.to}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flip Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setFlipped(!flipped)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {flipped ? 'See Old Belief' : 'See New Belief'}
          </button>
        </div>

        {/* Why This Matters */}
        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Why This Shift Matters
          </h4>
          <p className="text-purple-800">{shift.why}</p>
        </div>

        {/* Daily Practice */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Daily Practice
          </h4>
          <p className="text-gray-700">{shift.practice}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">
            {currentShift + 1} of {shifts.length}
          </span>
          <button
            onClick={handleNext}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Global CSS for 3D transform */}
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default MindsetShifts;