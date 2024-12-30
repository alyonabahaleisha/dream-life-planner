// components/Roadmap/sections/OverviewSection.jsx
import React from 'react';

export const OverviewSection = ({ isLoading, content }) => (
    <div className="prose max-w-none">
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-gray-600">
          {content}
        </div>
      )}
    </div>
  );