import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { X, Plus, Sparkles, Heart, Star } from 'lucide-react';

const GratitudeStoryProgressive = ({ story, onComplete, onReset }) => {
  const [visibleLines, setVisibleLines] = useState(2);
  const [isRevealing, setIsRevealing] = useState(false);
  
  // Split story into individual lines
  const lines = story.split('\n').filter(line => line.trim());
  const totalLines = lines.length;
  const allRevealed = visibleLines >= totalLines;
  
  // Categorize lines for special styling
  const getLineStyle = (line, index) => {
    if (line.includes('Thank you')) return 'gratitude';
    if (index === 0) return 'opening';
    if (index === totalLines - 1) return 'closing';
    if (line.includes('No more') || line.includes('Gone.')) return 'transformation';
    if (line.includes('"') && line.includes('"')) return 'thought';
    return 'normal';
  };
  
  const revealMore = () => {
    setIsRevealing(true);
    // Reveal 2-3 more lines
    const linesToReveal = Math.min(3, totalLines - visibleLines);
    setVisibleLines(prev => prev + linesToReveal);
    
    setTimeout(() => setIsRevealing(false), 300);
  };
  
  const revealAll = () => {
    setIsRevealing(true);
    setVisibleLines(totalLines);
    setTimeout(() => setIsRevealing(false), 300);
  };
  
  // Auto-scroll to new content when revealed
  useEffect(() => {
    if (isRevealing) {
      const newContent = document.getElementById(`line-${visibleLines - 1}`);
      if (newContent) {
        newContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [visibleLines, isRevealing]);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-white to-blue-50/20 rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-8 py-6 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="absolute top-4 right-4 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h2 className="text-2xl font-light text-gray-800">Your Gratitude Story</h2>
              <Sparkles className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-500">Each line reveals a piece of your transformed life</p>
          </div>
        </div>
        
        {/* Story Content */}
        <div className="p-8 md:p-12 space-y-4 max-h-[600px] overflow-y-auto">
          {lines.slice(0, visibleLines).map((line, index) => {
            const lineStyle = getLineStyle(line, index);
            
            return (
              <div
                key={index}
                id={`line-${index}`}
                className={`transform transition-all duration-500 ${
                  index >= visibleLines - 3 && isRevealing ? 'animate-fadeIn' : ''
                }`}
                style={{
                  animationDelay: `${(index - (visibleLines - 3)) * 100}ms`
                }}
              >
                {lineStyle === 'gratitude' && (
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 shadow-sm border border-purple-200/50">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                      <p className="text-lg text-purple-900 font-medium leading-relaxed">{line}</p>
                    </div>
                  </div>
                )}
                
                {lineStyle === 'opening' && (
                  <div className="text-center mb-8">
                    <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed">
                      {line}
                    </p>
                  </div>
                )}
                
                {lineStyle === 'closing' && (
                  <div className="mt-8 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] rounded-2xl">
                      <div className="bg-white rounded-2xl px-8 py-6">
                        <p className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                          {line}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {lineStyle === 'transformation' && (
                  <div className="bg-green-50 border-l-4 border-green-400 pl-6 py-3">
                    <p className="text-gray-700 font-medium">{line}</p>
                  </div>
                )}
                
                {lineStyle === 'thought' && (
                  <div className="pl-8 relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl text-gray-300">"</div>
                    <p className="text-gray-700 italic text-lg">{line}</p>
                  </div>
                )}
                
                {lineStyle === 'normal' && (
                  <p className="text-gray-700 leading-relaxed text-lg pl-4">{line}</p>
                )}
              </div>
            );
          })}
          
          {/* Reveal More Button */}
          {!allRevealed && (
            <div className="pt-8 flex flex-col items-center gap-4 animate-pulse">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              
              <button
                onClick={revealMore}
                className="group flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <Plus className="h-5 w-5 text-blue-600 group-hover:rotate-90 transition-transform" />
                <span className="text-gray-700 font-medium">
                  Reveal {Math.min(3, totalLines - visibleLines)} more lines
                </span>
              </button>
              
              <button
                onClick={revealAll}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                or show everything
              </button>
              
              <div className="flex gap-1 mt-2">
                {Array.from({ length: Math.ceil(totalLines / 3) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-all ${
                      i < Math.ceil(visibleLines / 3) 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Action */}
        {allRevealed && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              </div>
              <p className="text-white/90 text-lg mb-6">
                This is your life now. Every word is your reality.
              </p>
              <Button
                onClick={onComplete}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium shadow-lg"
              >
                Continue to Your Dream Day Schedule
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeStoryProgressive;