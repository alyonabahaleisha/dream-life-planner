import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import { X, Clock, ChevronRight, Sun, Sunrise, Sunset } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TimelineItem = ({ time, activity, isLast }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-blue-400 border-4 border-blue-100" />
      {!isLast && <div className="w-0.5 h-full bg-blue-100 my-1" />}
    </div>
    
    <div className="flex-1 pb-8">
      <div className="bg-gray-50 rounded-xl p-4 pr-8 relative group hover:bg-gray-100 transition-colors">
        <div className="text-gray-900 font-medium">{activity.split(':')[0]}</div>
        <div className="text-gray-500 text-sm mt-1">
          {activity.split(':').slice(1).join(':').trim()}
        </div>
        <div className="absolute right-4 top-4 text-sm text-gray-500">{time}</div>
      </div>
    </div>
  </div>
);

const TimelineSection = ({ title, items, icon: Icon }) => (
  <div className="relative">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
    </div>
    {items.map((item, index) => (
      <TimelineItem
        key={index}
        {...item}
        isLast={index === items.length - 1}
      />
    ))}
  </div>
);

const StoryResponse = ({ story, image, isLoading, onReset }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const storyRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollTop = storyRef.current.scrollHeight;
    }
  }, [story]);

  useEffect(() => {
    if (story && story.includes('[SCHEDULE]')) {
      setIsStoryComplete(true);
    }
  }, [story]);

  const formatContent = (text) => {
    if (!text) return { story: '', schedule: {} };
    
    const parts = text.split('[SCHEDULE]');
    if (parts.length < 2) return { story: text, schedule: {} };

    const storyPart = parts[0].replace('[STORY]', '').trim();
    const schedulePart = parts[1].trim();

    const lines = schedulePart.split('\n');
    let currentSection = null;
    const sections = {
      morning: [],
      day: [],
      evening: []
    };

    lines.forEach(line => {
      const trimmedLine = line.trim();

      if (trimmedLine === '[MORNING]') currentSection = 'morning';
      else if (trimmedLine === '[DAY]') currentSection = 'day';
      else if (trimmedLine === '[EVENING]') currentSection = 'evening';
      else if (trimmedLine && currentSection) {
        const timeMatch = trimmedLine.match(/^([0-9]{1,2}:[0-9]{2}\s*[APM]{2}|[0-9]{1,2}\s*[APM]{2})/i);
        if (timeMatch) {
          const time = timeMatch[1].toUpperCase();
          const rest = trimmedLine.slice(timeMatch[0].length).trim();
          const parts = rest.split(':').map(part => part.trim()).filter(Boolean);
          
          if (parts.length > 0) {
            sections[currentSection].push({
              time: time,
              activity: parts.join(': ')
            });
          }
        }
      }
    });

    return { story: storyPart, schedule: sections };
  };

  const { story: storyText, schedule } = formatContent(story);
  
  useEffect(() => {
    if (storyText) {
      localStorage.setItem('storyText', storyText);
    }
  }, [storyText]);

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
        
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            {image ? (
              <div className="relative">
                <img 
                  src={image.url} 
                  alt="Inspiring lifestyle visualization"
                  className="w-[704px] h-[320px] object-cover"
                />
              </div>
            ) : (
              <div className="w-[704px] h-[320px] bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500 flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-2" />
                  <span>Generating your dream lifestyle ...</span>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-normal text-gray-800">
            A Day in Your Dream Life
          </h2>
          
          <div className="prose prose-lg max-w-none">
            {isLoading && !story ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
              </div>
            ) : (
              <div ref={storyRef} className="whitespace-pre-wrap text-gray-700">
                {storyText}
                {isLoading && (
                  <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
                )}
              </div>
            )}
          </div>

          {story && (
            <>
              {(isStoryComplete && isLoading) ? (
                <div className="mt-8 flex justify-center">
                  <div className="text-gray-500 flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-2" />
                    <span>Generating your schedule...</span>
                  </div>
                </div>
              ) : !showSchedule && isStoryComplete && !isLoading && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => setShowSchedule(true)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    See your schedule
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}

          {showSchedule && story && (
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-medium text-gray-800 mb-6">
                Your Daily Schedule
              </h3>
              <div className="pl-4 space-y-12">
                {schedule.morning?.length > 0 && (
                  <TimelineSection 
                    title="Morning" 
                    items={schedule.morning}
                    icon={Sunrise}
                  />
                )}
                {schedule.day?.length > 0 && (
                  <TimelineSection 
                    title="Day" 
                    items={schedule.day}
                    icon={Sun}
                  />
                )}
                {schedule.evening?.length > 0 && (
                  <TimelineSection 
                    title="Evening" 
                    items={schedule.evening}
                    icon={Sunset}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        
        {showSchedule && (
          <div className="mt-8 flex justify-end gap-3">
            <Button
              onClick={() => navigate('/assessment')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              I want to make it my reality
            </Button>
            <Button
              onClick={onReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Create Another Dream
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryResponse;