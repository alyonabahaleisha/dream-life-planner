import React, { useState } from 'react';
import { Button } from "../ui/button";
import { X, Sparkles } from 'lucide-react';

const GratitudeStoryTeaser = ({ story, onComplete, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get first two lines as teaser
  const lines = story.split('\n').filter(line => line.trim());
  const teaserLines = lines.slice(0, 2);
  const hasMore = lines.length > 2;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 relative min-h-[400px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex flex-col items-center justify-center h-full">
          {!isExpanded ? (
            // Teaser view
            <div className="text-center max-w-2xl animate-fadeIn">
              <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-6" />
              
              <div className="space-y-3 mb-8">
                {teaserLines.map((line, index) => (
                  <p 
                    key={index}
                    className="text-xl text-gray-700 font-light leading-relaxed"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              
              {hasMore && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Your complete transformation story awaits...</p>
                  <Button
                    onClick={() => setIsExpanded(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Read Your Full Story
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Full story view
            <div className="w-full animate-fadeIn">
              <h2 className="text-2xl font-light text-gray-800 mb-6 text-center">Your Gratitude Story</h2>
              
              <div className="prose prose-lg max-w-none">
                {lines.map((line, index) => (
                  <p 
                    key={index}
                    className={`text-gray-700 leading-relaxed mb-4 ${
                      line.includes('Thank you') ? 'font-medium text-blue-700' : ''
                    } ${
                      index === 0 || index === lines.length - 1 ? 'text-lg font-light' : ''
                    }`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeIn 0.5s ease-out forwards',
                      opacity: 0
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button
                  onClick={onComplete}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Continue to Your Dream Schedule
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GratitudeStoryTeaser;