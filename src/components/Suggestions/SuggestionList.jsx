import React from 'react';
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import SuggestionButton from './SuggestionButton';
import { initialSuggestions, moreSuggestions } from '../../data/suggestions';

const SuggestionList = ({ onSuggestionClick }) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center px-4">
        {initialSuggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            suggestion={suggestion}
            onClick={onSuggestionClick}
          />
        ))}
        
        <Button
          variant="outline"
          className="bg-white shadow-md hover:shadow-lg rounded-full text-sm text-gray-700 font-normal transition-all flex items-center gap-1 px-4"
          onClick={() => setShowMore(!showMore)}
        >
          More options {showMore ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </div>

      {showMore && (
        <div className="mt-2 flex flex-wrap gap-2 justify-center px-4">
          {moreSuggestions.map((suggestion, index) => (
            <SuggestionButton
              key={index}
              suggestion={suggestion}
              onClick={onSuggestionClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SuggestionList;