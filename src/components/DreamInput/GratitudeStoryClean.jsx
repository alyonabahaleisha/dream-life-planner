import React, { useState } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

const GratitudeStoryClean = ({ story, onComplete, onReset }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedInSection, setExpandedInSection] = useState(false);
  
  // Split story into 6 sections
  const splitIntoSections = (storyText) => {
    const lines = storyText.split('\n').filter(line => line.trim());
    const totalLines = lines.length;
    const linesPerSection = Math.ceil(totalLines / 6);
    
    const sections = [];
    for (let i = 0; i < 6; i++) {
      const start = i * linesPerSection;
      const end = Math.min(start + linesPerSection, totalLines);
      const sectionLines = lines.slice(start, end);
      
      if (sectionLines.length > 0) {
        sections.push({
          id: i,
          firstLine: sectionLines[0],
          remainingLines: sectionLines.slice(1),
          hasMore: sectionLines.length > 1,
          isGratitude: sectionLines.some(line => line.includes('Thank you'))
        });
      }
    }
    
    return sections;
  };
  
  const sections = splitIntoSections(story);
  const section = sections[currentSection] || sections[0];
  
  const handleMore = () => {
    if (!expandedInSection && section.hasMore) {
      setExpandedInSection(true);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setExpandedInSection(false);
    } else {
      onComplete();
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="min-h-[600px] flex flex-col items-center justify-center relative">
        {/* Progress dots - same style as AHA moments */}
        <div className="absolute top-12 flex gap-3">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentSection ? 'bg-blue-500 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Story Display - same style as AHA moments */}
        <div className="text-center px-8 animate-fadeIn" key={currentSection}>
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            MOMENT #{currentSection + 1}
          </div>
          
          {/* First line - larger like AHA moments */}
          <h2 className={`text-3xl md:text-4xl font-light leading-tight mb-8 ${
            section.isGratitude 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              : 'text-gray-800'
          }`}>
            {section.firstLine}
          </h2>
          
          {/* Remaining lines - shown when expanded */}
          {expandedInSection && section.remainingLines.map((line, index) => (
            <p 
              key={index}
              className="text-xl text-gray-600 leading-relaxed mb-4 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* More button - positioned like AHA CTA */}
        <div className="absolute bottom-12 animate-fadeIn">
          <Button
            onClick={handleMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            {!expandedInSection && section.hasMore 
              ? 'More...'
              : currentSection < sections.length - 1 
                ? 'Next Moment'
                : '✨ See Your Daily Schedule'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeStoryClean;