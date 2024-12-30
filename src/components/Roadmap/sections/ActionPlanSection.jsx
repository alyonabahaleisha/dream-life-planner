// components/Roadmap/sections/ActionPlanSection.jsx
import React from 'react';
import ActionPlan from '../ActionPlan';

export const ActionPlanSection = ({ isLoading, plan }) => (
    <>
      {isLoading ? (
        <div className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse h-48" />
          ))}
        </div>
      ) : (
        <ActionPlan plan={plan} />
      )}
    </>
  );