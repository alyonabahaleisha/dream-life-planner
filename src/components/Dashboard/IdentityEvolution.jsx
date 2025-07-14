import React from 'react';
import { User, TrendingUp, Star, Crown, ChevronRight } from 'lucide-react';

const IdentityEvolution = ({ evolution = {} }) => {
  if (!evolution || !evolution.stages || evolution.stages.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No identity evolution data available
      </div>
    );
  }

  const currentStageIndex = evolution.currentStage - 1 || 0;
  const stages = evolution.stages;

  const getStageIcon = (stage, index) => {
    if (index === 0) return <User className="w-6 h-6" />;
    if (index === stages.length - 1) return <Crown className="w-6 h-6" />;
    if (index < currentStageIndex) return <Star className="w-6 h-6" />;
    return <TrendingUp className="w-6 h-6" />;
  };

  const getStageColor = (index) => {
    if (index < currentStageIndex) return 'bg-green-500 text-white';
    if (index === currentStageIndex) return 'bg-purple-600 text-white animate-pulse';
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Who You're Becoming</h2>
      <p className="text-gray-600 mb-8">Your transformation journey from dreamer to achiever</p>

      {/* Progress Path */}
      <div className="relative mb-12">
        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Progress Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stage Markers */}
          <div className="relative flex justify-between">
            {stages.map((stage, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* Stage Circle */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  getStageColor(index)
                } ${index === currentStageIndex ? 'scale-110 shadow-lg' : 'hover:scale-105'}`}>
                  {getStageIcon(stage, index)}
                </div>
                
                {/* Stage Label */}
                <div className="mt-4 text-center">
                  <h4 className={`font-semibold ${
                    index === currentStageIndex ? 'text-purple-600' : 'text-gray-700'
                  }`}>
                    {stage.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{stage.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                index === currentStageIndex 
                  ? 'bg-purple-50 border-2 border-purple-300' 
                  : index < currentStageIndex
                  ? 'bg-green-50'
                  : 'bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                getStageColor(index)
              }`}>
                {getStageIcon(stage, index)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{stage.title}</h4>
                <p className="text-sm text-gray-600">{stage.timeframe}</p>
              </div>
              {index === currentStageIndex && (
                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                  You are here
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Stage Details */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 mb-6">
        <div className="mb-4">
          <span className="text-sm text-purple-600 font-medium">Current Stage</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">
            {stages[currentStageIndex].title}
          </h3>
          <p className="text-gray-600 mt-2">{stages[currentStageIndex].description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Your Characteristics</h4>
            <ul className="space-y-2">
              {stages[currentStageIndex].characteristics?.map((char, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span className="text-gray-700">{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {stages[currentStageIndex].milestone && (
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-1">Next Milestone</h4>
              <p className="text-purple-700">{stages[currentStageIndex].milestone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Stage Preview */}
      {currentStageIndex < stages.length - 1 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <h4 className="font-semibold text-gray-900">Next Up: {stages[currentStageIndex + 1].title}</h4>
          </div>
          <p className="text-gray-700 mb-3">{stages[currentStageIndex + 1].description}</p>
          <div className="text-sm text-gray-600">
            <span className="font-medium">What it takes:</span>
            <ul className="mt-1 space-y-1">
              {stages[currentStageIndex + 1].characteristics?.slice(0, 2).map((char, index) => (
                <li key={index}>• {char}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Motivation Quote */}
      <div className="mt-8 text-center">
        <blockquote className="text-lg text-gray-700 italic">
          "Every expert was once a beginner. Every pro was once an amateur. Every icon was once an iconoclast."
        </blockquote>
        <p className="text-sm text-gray-500 mt-2">— Keep evolving, one stage at a time</p>
      </div>
    </div>
  );
};

export default IdentityEvolution;