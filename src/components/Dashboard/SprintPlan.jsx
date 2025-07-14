import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Target, Calendar, CheckSquare } from 'lucide-react';

const SprintPlan = ({ sprintPlan = {} }) => {
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true }); // First week expanded by default

  const toggleWeek = (weekNumber) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const phases = [
    { key: 'phase1', name: 'Foundation', icon: '🏗️', weeks: 4 },
    { key: 'phase2', name: 'Build', icon: '🚀', weeks: 4 },
    { key: 'phase3', name: 'Launch', icon: '✨', weeks: 4 }
  ];

  if (!sprintPlan || Object.keys(sprintPlan).length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No sprint plan available
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">90-Day Action Sprint</h2>
      <p className="text-gray-600 mb-6">Your week-by-week roadmap to build momentum</p>

      {phases.map((phase) => {
        const phaseData = sprintPlan[phase.key];
        if (!phaseData) return null;

        return (
          <div key={phase.key} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{phase.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900">
                {phaseData.name || phase.name} (Days {phase.key === 'phase1' ? '1-30' : phase.key === 'phase2' ? '31-60' : '61-90'})
              </h3>
            </div>

            <div className="space-y-3">
              {phaseData.weeks?.map((week) => (
                <div key={week.week} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleWeek(week.week)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">{week.week}</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Week {week.week}: {week.theme}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3" />
                          {week.timeCommitment}
                        </p>
                      </div>
                    </div>
                    {expandedWeeks[week.week] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedWeeks[week.week] && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <div className="pt-4 space-y-4">
                        {/* Actions */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-purple-600" />
                            Key Actions
                          </h5>
                          <ul className="space-y-2">
                            {week.actions?.map((action, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverable */}
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-medium text-purple-900 mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Week Goal
                          </h5>
                          <p className="text-purple-700">{week.deliverable}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Sprint Summary */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Sprint Success Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Start with just 30 minutes daily and build up gradually</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Focus on progress, not perfection</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Review and adjust your plan weekly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Celebrate small wins along the way</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SprintPlan;