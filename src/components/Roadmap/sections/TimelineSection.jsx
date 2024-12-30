// components/Roadmap/sections/TimelineSection.jsx
import React from 'react';
import RoadmapSchedule from '../RoadmapSchedule';

export const TimelineSection = ({ isLoading, timelineData }) => (
  <>
    {isLoading ? (
      <div className="space-y-6">
        <div className="h-12 bg-gray-100 rounded animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    ) : (
      <RoadmapSchedule timelineData={timelineData} />
    )}
  </>
);