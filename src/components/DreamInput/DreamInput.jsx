import React from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Sparkles } from 'lucide-react';
import SuggestionList from '../Suggestions/SuggestionList';

const DreamInput = ({ 
  dreamLife, 
  setDreamLife, 
  handleSubmit, 
  isLoading,
  textareaRef,
  usageStatus
}) => {
  const handleSuggestionClick = (suggestion) => {
    setDreamLife(prev => {
      if (!prev) return suggestion;
      return prev + ', ' + suggestion.toLowerCase();
    });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
      <h1 className="text-5xl font-normal text-center mb-8 text-gray-800">
        What does your dream life look like?
      </h1>
      
      {/* Usage Status */}
      {!usageStatus.loading && !usageStatus.isPremium && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            {usageStatus.isAnonymous ? (
              <>You have <span className="font-semibold">{usageStatus.remaining}</span> free attempts. 
              Sign in for 20 free attempts!</>
            ) : (
              <>You have <span className="font-semibold">{usageStatus.remaining}</span> of {usageStatus.limit} free attempts remaining</>
            )}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white rounded-2xl shadow-lg relative">
          <Textarea
            ref={textareaRef}
            value={dreamLife}
            onChange={(e) => setDreamLife(e.target.value)}
            placeholder="Tell me about your dream life, and I will continue..."
            className="min-h-[120px] text-gray-700 text-lg border-0 focus:ring-0 resize-none rounded-2xl p-6 placeholder:text-gray-500"
            autoFocus
          />
          
          <Button 
            type="submit"
            size="icon"
            disabled={isLoading || !dreamLife.trim()}
            className="absolute bottom-4 right-4 rounded-lg w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <SuggestionList onSuggestionClick={handleSuggestionClick} />
    </div>
  );
};

export default DreamInput;