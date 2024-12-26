import React from 'react';
import SuggestionButton from './SuggestionButton';
import { initialSuggestions, moreSuggestions } from '../../data/suggestions';

const ScrollingRow = ({ suggestions, direction = 'right', onSuggestionClick }) => {
  const duplicatedSuggestions = [...suggestions, ...suggestions];
  
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className={`inline-flex gap-4 whitespace-nowrap ${
          direction === 'left' ? 'scroll-reverse' : 'scroll-forward'
        }`}
      >
        {duplicatedSuggestions.map((suggestion, index) => (
          <SuggestionButton
            key={`${suggestion}-${index}`}
            suggestion={suggestion}
            onClick={onSuggestionClick}
            className="whitespace-nowrap flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

const SuggestionList = ({ onSuggestionClick }) => {
  // Combine all suggestions
  const allSuggestions = [...initialSuggestions, ...moreSuggestions];
  
  // Split into three roughly equal rows
  const totalItems = allSuggestions.length;
  const itemsPerRow = Math.ceil(totalItems / 3);
  
  const row1 = allSuggestions.slice(0, itemsPerRow);
  const row2 = allSuggestions.slice(itemsPerRow, itemsPerRow * 2);
  const row3 = allSuggestions.slice(itemsPerRow * 2);

  return (
    <div className="w-full space-y-4">
      <style>
        {`
          @keyframes scrollForward {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          
          @keyframes scrollReverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          
          .scroll-forward {
            animation: scrollForward 320s linear infinite;
          }
          
          .scroll-reverse {
            animation: scrollReverse 320s linear infinite;
          }

          /* Pause on hover */
          .relative:hover > div {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="space-y-2">
        <ScrollingRow 
          suggestions={row1} 
          direction="right" 
          onSuggestionClick={onSuggestionClick} 
        />
        <ScrollingRow 
          suggestions={row2} 
          direction="left" 
          onSuggestionClick={onSuggestionClick} 
        />
        <ScrollingRow 
          suggestions={row3} 
          direction="right" 
          onSuggestionClick={onSuggestionClick} 
        />
      </div>
    </div>
  );
};

export default SuggestionList;