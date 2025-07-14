import React, { useState } from 'react';
import { ChevronRight, Target, Calendar, CheckCircle } from 'lucide-react';

const MilestoneTimeline = ({ milestones = [] }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No milestones available
      </div>
    );
  }

  const currentMilestone = milestones[selectedMilestone];

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Journey Milestones</h2>
      
      {/* Timeline - Horizontal on desktop, vertical on mobile */}
      <div className="mb-8">
        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200"></div>
            
            {/* Milestones */}
            <div className="relative flex justify-between">
              {milestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMilestone(index)}
                  className="flex flex-col items-center group"
                >
                  {/* Milestone Dot */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index === selectedMilestone
                      ? 'bg-purple-600 scale-110 shadow-lg'
                      : index === 0
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}>
                    {index === 0 ? (
                      <span className="text-white text-sm font-bold">NOW</span>
                    ) : (
                      <span className="text-white font-bold">{index}</span>
                    )}
                  </div>
                  
                  {/* Milestone Label */}
                  <div className="mt-3 text-center max-w-[120px]">
                    <p className={`text-sm font-medium ${
                      index === selectedMilestone ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {milestone.timeframe}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-4">
          {milestones.map((milestone, index) => (
            <button
              key={index}
              onClick={() => setSelectedMilestone(index)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all ${
                index === selectedMilestone
                  ? 'bg-purple-50 border-l-4 border-purple-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                index === selectedMilestone
                  ? 'bg-purple-600 text-white'
                  : index === 0
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {index === 0 ? '✓' : index}
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{milestone.title}</p>
                <p className="text-sm text-gray-600">{milestone.timeframe}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Milestone Details */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentMilestone.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {currentMilestone.timeframe}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          {currentMilestone.description}
        </p>

        {/* Success Criteria */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            Success Criteria
          </h4>
          <ul className="space-y-2">
            {currentMilestone.criteria?.map((criterion, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{criterion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dependencies */}
        {currentMilestone.dependencies && currentMilestone.dependencies.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Prerequisites</h4>
            <ul className="space-y-1">
              {currentMilestone.dependencies.map((dep, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{dep}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneTimeline;