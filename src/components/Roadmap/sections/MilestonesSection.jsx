// components/Roadmap/sections/MilestonesSection.jsx
import React from 'react';
import { MilestoneCard } from '../MilestoneCard';

export const MilestonesSection = ({ isLoading, milestones }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading ? (
        Array(4).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse h-48" />
        ))
      ) : (
        milestones.map((milestone, index) => (
          <MilestoneCard
            key={index}
            {...milestone}
          />
        ))
      )}
    </div>
  );