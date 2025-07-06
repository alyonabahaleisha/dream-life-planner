import React, { useState } from 'react';
import { Button } from "../ui/button";
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const GratitudeStory = ({ story, onComplete, onReset }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  
  // Split story into sections (by double newlines or periods followed by newlines)
  const parseStoryIntoSections = (storyText) => {
    // Split by double newlines first
    const paragraphs = storyText.split('\n\n').filter(p => p.trim());
    
    // Create sections with preview (first 2 sentences) and full content
    const sections = paragraphs.map((paragraph, index) => {
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      const preview = sentences.slice(0, 2).join(' ').trim();
      const hasMore = sentences.length > 2;
      const fullContent = paragraph;
      
      return {
        id: `section-${index}`,
        preview,
        fullContent,
        hasMore,
        isImportant: paragraph.includes('Thank you') || index === 0 || index === paragraphs.length - 1
      };
    });
    
    return sections;
  };
  
  const sections = parseStoryIntoSections(story);
  
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  const expandAll = () => {
    setExpandedSections(sections.map(s => s.id));
  };
  
  const allExpanded = expandedSections.length === sections.filter(s => s.hasMore).length;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-800 mb-2">Your Gratitude Story</h2>
          <p className="text-sm text-gray-500">Click to expand each moment</p>
        </div>
        
        {/* Story Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`border rounded-lg transition-all duration-300 ${
                section.isImportant ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
              } ${expandedSections.includes(section.id) ? 'shadow-md' : ''}`}
            >
              <div 
                className={`p-6 ${section.hasMore ? 'cursor-pointer' : ''}`}
                onClick={() => section.hasMore && toggleSection(section.id)}
              >
                <p className={`text-gray-700 leading-relaxed ${
                  expandedSections.includes(section.id) ? '' : 'line-clamp-2'
                }`}>
                  {expandedSections.includes(section.id) ? section.fullContent : section.preview}
                </p>
                
                {section.hasMore && (
                  <button className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    {expandedSections.includes(section.id) ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Read more
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          {!allExpanded && sections.some(s => s.hasMore) && (
            <Button
              onClick={expandAll}
              variant="outline"
              className="text-gray-600"
            >
              Expand All Moments
            </Button>
          )}
          
          <Button
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
          >
            Continue to Your Daily Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeStory;