import React, { useState } from 'react';
import { Clock, Sunrise, Sun, Moon, Calendar, Zap } from 'lucide-react';

const DailyRoutines = ({ routines = [] }) => {
  const [selectedRoutine, setSelectedRoutine] = useState(0);

  if (!routines || routines.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No routines available
      </div>
    );
  }

  const getRoutineIcon = (routine) => {
    const name = routine.name?.toLowerCase() || '';
    if (name.includes('morning')) return <Sunrise className="w-5 h-5" />;
    if (name.includes('evening')) return <Moon className="w-5 h-5" />;
    if (name.includes('work') || name.includes('deep')) return <Sun className="w-5 h-5" />;
    if (name.includes('weekly')) return <Calendar className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const currentRoutine = routines[selectedRoutine];

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Success Routines</h2>
      <p className="text-gray-600 mb-6">Daily habits that will transform your dream into reality</p>

      {/* Routine Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {routines.map((routine, index) => (
          <button
            key={index}
            onClick={() => setSelectedRoutine(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              index === selectedRoutine
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getRoutineIcon(routine)}
            <span className="font-medium">{routine.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Routine Details */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                {getRoutineIcon(currentRoutine)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{currentRoutine.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {currentRoutine.timeSlot} • {currentRoutine.duration}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Purpose */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Why This Matters</h4>
            <p className="text-gray-700 bg-purple-50 rounded-lg p-4">
              {currentRoutine.purpose}
            </p>
          </div>

          {/* Activities */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Step-by-Step Breakdown</h4>
            <div className="space-y-3">
              {currentRoutine.activities?.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{activity.task}</p>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    {activity.instructions && (
                      <p className="text-sm text-gray-600">{activity.instructions}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Impact */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              After 30 Days
            </h4>
            <p className="text-gray-700">{currentRoutine.impact}</p>
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Implementation Tips</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Start with just one routine until it becomes automatic</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Set reminders on your phone for the first week</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Track completion with a simple checkbox or app</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Be flexible - adjust timing to fit your life</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailyRoutines;