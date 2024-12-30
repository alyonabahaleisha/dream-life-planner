// components/Roadmap/AccordionTriggerContent.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const AccordionTriggerContent = ({ icon: Icon, title, isLoading, isReady = false }) => (
  <div className="flex items-center gap-2">
    {Icon && <Icon className="w-5 h-5" />}
    <span>{title}</span>
    {isLoading && (
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 ml-2" />
    )}
    {!isLoading && isReady && (
      <div className="ml-2 text-green-500">
        <CheckCircle2 className="w-4 h-4" />
      </div>
    )}
  </div>
);