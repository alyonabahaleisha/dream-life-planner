// components/Roadmap/ActionItem.jsx
import React from 'react';

export const ActionItem = ({ title, description, isCompleted, onToggle }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={onToggle}
      className="mt-1"
    />
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);