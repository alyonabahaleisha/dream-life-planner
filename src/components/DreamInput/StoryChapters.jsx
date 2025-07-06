import React, { useState } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

const StoryChapters = ({ storyChapters, onComplete, onReset }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapterReactions, setChapterReactions] = useState({});

  const handleChapterReaction = (chapterId, reaction) => {
    setChapterReactions({...chapterReactions, [chapterId]: reaction});
    
    // Auto-advance to next chapter after reaction
    setTimeout(() => {
      if (currentChapter < storyChapters.length - 1) {
        setCurrentChapter(currentChapter + 1);
      } else {
        onComplete();
      }
    }, 500);
  };

  const currentChapterData = storyChapters[currentChapter];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 relative min-h-[600px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Chapter Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-light text-gray-800">Your Dream Life Story</h2>
            <span className="text-sm text-gray-500">
              Chapter {currentChapter + 1} of {storyChapters.length}
            </span>
          </div>
          <div className="flex gap-2">
            {storyChapters.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index <= currentChapter ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Chapter */}
        <div className="animate-fadeIn" key={currentChapter}>
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">{currentChapterData.icon}</div>
            <h3 className="text-xl font-medium text-gray-800">{currentChapterData.title}</h3>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {currentChapterData.content}
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500 mb-8">
            <p className="text-gray-800 font-medium italic">
              "{currentChapterData.highlight}"
            </p>
          </div>

          {/* Reaction Buttons */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600">How does this make you feel?</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleChapterReaction(currentChapterData.id, 'inspired')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
                <span className="text-gray-700">Inspired</span>
              </button>
              <button
                onClick={() => handleChapterReaction(currentChapterData.id, 'excited')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
                <span className="text-gray-700">Excited</span>
              </button>
              <button
                onClick={() => handleChapterReaction(currentChapterData.id, 'loved')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-red-50 rounded-lg transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">❤️</span>
                <span className="text-gray-700">Love it</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryChapters;