// components/Roadmap/MilestoneCard.jsx
import React from 'react';
import { Progress } from '../ui/progress';

export const MilestoneCard = ({ title, timeframe, description, progress }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <span className="text-sm text-blue-600 font-medium">{timeframe}</span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="text-sm text-gray-500 text-right">{progress}% Complete</div>
    </div>
  </div>
);