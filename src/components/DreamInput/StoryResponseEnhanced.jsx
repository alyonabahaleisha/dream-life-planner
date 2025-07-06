// src/components/StoryResponseEnhanced.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import { 
  X, 
  Clock, 
  ChevronRight, 
  Sun, 
  Sunrise, 
  Sunset,
  Sparkles,
  ArrowRight,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal';
import LoadingScreen from './LoadingScreen';
import AHAMomentsDisplay from './AHAMomentsDisplay';
import GratitudeStoryChat from './GratitudeStoryChat';
import ImageReveal from './ImageReveal'; 

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

const StoryResponseEnhanced = ({ story, image, isLoading, onReset, onAuthSuccess }) => {
  const [phase, setPhase] = useState('loading'); // 'loading', 'aha', 'story', 'schedule'
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [ahaMoments, setAhaMoments] = useState([]);
  const [storyMoments, setStoryMoments] = useState([]);
  const navigate = useNavigate();

  // Parse story content to extract AHA moments
  const parseStoryContent = (text) => {
    if (!text) return { ahaMoments: [], storyPart: '', schedule: {} };
    
    // Extract AHA moments section
    const ahaMomentsMatch = text.match(/\[AHA_MOMENTS\]([\s\S]*?)\[STORY\]/);
    const extractedAhas = [];
    
    if (ahaMomentsMatch) {
      // Parse numbered AHA moments from backend
      const ahaSection = ahaMomentsMatch[1].trim();
      const ahaLines = ahaSection.split('\n').filter(line => line.trim());
      
      ahaLines.forEach(line => {
        // Remove numbering (e.g., "1. ", "2. ", etc.)
        const moment = line.replace(/^\d+\.\s*/, '').trim();
        if (moment) {
          extractedAhas.push(moment);
        }
      });
    }
    
    // If no AHA moments from backend, use fallback
    if (extractedAhas.length === 0) {
      extractedAhas.push(
        "You wake up excited about every single day",
        "Your work feels like play, not obligation",
        "Money flows from doing what you love",
        "People seek out your unique energy",
        "Opportunities find you effortlessly"
      );
    }
    
    // Extract story section
    const storyMatch = text.match(/\[STORY\]([\s\S]*?)\[SCHEDULE\]/);
    const storyPart = storyMatch ? storyMatch[1].trim() : '';
    
    // Split story into paragraphs for progressive reveal
    const paragraphs = storyPart.split('\n\n').filter(p => p.trim());
    const moments = paragraphs.map((para, index) => ({
      content: para,
      hook: index < paragraphs.length - 1 ? 
        ["But there's more...", "And it gets better...", "But here's what really surprises you...", "And the best part..."][index] || "There's more..." 
        : null
    }));
    
    // Extract schedule section
    const scheduleMatch = text.match(/\[SCHEDULE\]([\s\S]*?)$/);
    const schedulePart = scheduleMatch ? scheduleMatch[1].trim() : '';
    
    return {
      ahaMoments: extractedAhas.slice(0, 5),
      storyMoments: moments,
      schedule: parseSchedule(schedulePart)
    };
  };

  const parseSchedule = (schedulePart) => {
    const sections = { morning: [], day: [], evening: [] };
    let currentSection = null;
    
    schedulePart.split('\n').forEach(line => {
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
    
    return sections;
  };

  // Process story when it arrives
  useEffect(() => {
    if (story && !isLoading) {
      const { ahaMoments: ahas, storyMoments: moments, schedule } = parseStoryContent(story);
      setAhaMoments(ahas);
      setStoryMoments(moments);
      
      // Start AHA phase after a brief delay
      setTimeout(() => {
        setPhase('aha');
      }, 500);
    }
  }, [story, isLoading]);

  const handleAuthSuccess = (user) => {
    if (onAuthSuccess) {
      onAuthSuccess(user);
    }
    navigate('/assessment');
  };

  const formatContent = (text) => {
    if (!text) return { story: '', schedule: {} };
    
    const parts = text.split('[SCHEDULE]');
    if (parts.length < 2) return { story: text, schedule: {} };

    const storyPart = parts[0].replace('[STORY]', '').trim();
    const schedulePart = parts[1].trim();

    return { story: storyPart, schedule: parseSchedule(schedulePart) };
  };

  const { schedule } = formatContent(story);

  // Parse story into themed chapters (used in story phase)
  const storyChapters = [
    {
      id: 'morning',
      title: 'Your Perfect Morning',
      icon: '🌅',
      content: storyMoments[0]?.content || '',
      highlight: 'Every day starts with purpose and excitement'
    },
    {
      id: 'work',
      title: 'Work That Feels Like Play',
      icon: '⚡',
      content: storyMoments[1]?.content || '',
      highlight: 'Success flows naturally when you love what you do'
    },
    {
      id: 'impact',
      title: 'Your Growing Influence',
      icon: '⭐',
      content: storyMoments[2]?.content || '',
      highlight: 'People seek you out because of who you\'ve become'
    },
    {
      id: 'freedom',
      title: 'Ultimate Freedom',
      icon: '❤️',
      content: storyMoments[3]?.content || '',
      highlight: 'You choose your path, every single day'
    }
  ].filter(ch => ch.content);

  // Ensure all hooks are called before any conditional returns

  // Loading phase
  if (isLoading && !story) {
    return <LoadingScreen />;
  }

  // AHA Moments Phase
  if (phase === 'aha' && ahaMoments.length > 0) {
    return (
      <AHAMomentsDisplay
        ahaMoments={ahaMoments}
        onComplete={() => setPhase('story')}
      />
    );
  }

  // Story Phase - Gratitude Story with Progressive Reveal
  if (phase === 'story') {
    const storyContent = storyMoments.map(m => m.content).join('\n\n');
    return (
      <GratitudeStoryChat
        story={storyContent}
        onComplete={() => setPhase('image')}
        onReset={onReset}
      />
    );
  }

  // Enhanced Image Phase
  if (phase === 'image') {
    return (
      <ImageReveal
        image={image}
        ahaMoments={ahaMoments}
        onComplete={() => setPhase('schedule')}
        onReset={onReset}
      />
    );
  }

  // Schedule Phase
  if (phase === 'schedule') {
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
            <h3 className="text-xl font-medium text-gray-800 mb-6">
              Your Dream Life Schedule
            </h3>
            <div className="pl-4 space-y-12">
              {schedule.morning?.length > 0 && (
                <TimelineSection 
                  title="Morning Routine" 
                  items={schedule.morning}
                  icon={Sunrise}
                />
              )}
              {schedule.day?.length > 0 && (
                <TimelineSection 
                  title="Daytime Activities" 
                  items={schedule.day}
                  icon={Sun}
                />
              )}
              {schedule.evening?.length > 0 && (
                <TimelineSection 
                  title="Evening Relaxation" 
                  items={schedule.evening}
                  icon={Sunset}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-between items-center">
              <Button
                onClick={onReset}
                variant="outline"
                className="text-gray-600 gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Create Another Dream
              </Button>

              <Button
                onClick={() => setIsSignUpOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11 text-base px-6"
              >
                <Sparkles className="w-4 h-4" />
                Make It Reality
              </Button>
            </div>
          </div>
        </div>

        {/* Authentication Modal */}
        <AuthModal 
          isOpen={isSignUpOpen}
          setIsOpen={setIsSignUpOpen}
          isSignIn={false}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  return null;
};

export default StoryResponseEnhanced;