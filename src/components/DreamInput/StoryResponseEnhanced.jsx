// src/components/StoryResponseEnhanced.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import { 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal';
import LoadingScreen from './LoadingScreen';
import AHAMomentsDisplay from './AHAMomentsDisplay';
import GratitudeStoryChat from './GratitudeStoryChat';
import GratitudeStoryChatEnhanced from './GratitudeStoryChatEnhanced';
import GratitudeStoryChatUltraEnhanced from './GratitudeStoryChatUltraEnhanced';
import ImageReveal from './ImageReveal'; 

const StoryResponseEnhanced = ({ story, image, isLoading, onReset, onAuthSuccess }) => {
  const [phase, setPhase] = useState('loading'); // 'loading', 'aha', 'story', 'schedule'
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [ahaMoments, setAhaMoments] = useState([]);
  const [storyMoments, setStoryMoments] = useState([]);
  const navigate = useNavigate();

  // Parse story content to extract AHA moments
  const parseStoryContent = (data) => {
    // Try to parse as JSON first (new dialogue format)
    if (typeof data === 'string' && data.startsWith('{')) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.dialogue) {
          return {
            ahaMoments: parsed.ahaMoments || [],
            dialogue: parsed.dialogue,
            universeWhispers: parsed.universeWhispers || [],
            storyMoments: [], // Empty for new format
            isNewFormat: true
          };
        }
      } catch (e) {
        // Not JSON, continue with legacy parsing
      }
    }
    
    // Check if we have the new dialogue format as object
    if (typeof data === 'object' && data.dialogue) {
      return {
        ahaMoments: data.ahaMoments || [],
        dialogue: data.dialogue,
        universeWhispers: data.universeWhispers || [],
        storyMoments: [], // Empty for new format
        isNewFormat: true
      };
    }
    
    // Legacy text parsing for backward compatibility
    const text = typeof data === 'string' ? data : (data.story || '');
    if (!text) return { ahaMoments: [], storyPart: '', storyMoments: [], schedule: {}, isNewFormat: false };
    
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
      storyMoments: moments
    };
  };


  // Process story when it arrives
  useEffect(() => {
    if (story && !isLoading) {
      console.log('Processing story:', story);
      const parsedContent = parseStoryContent(story);
      console.log('Parsed content:', parsedContent);
      
      const { ahaMoments: ahas, storyMoments: moments } = parsedContent;
      setAhaMoments(ahas);
      setStoryMoments(moments || []);
      
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


  // Removed schedule functionality

  // Ensure all hooks are called before any conditional returns

  // Loading phase
  if (isLoading && !story) {
    return <LoadingScreen />;
  }

  // AHA Moments Phase
  if (phase === 'aha') {
    console.log('AHA phase with moments:', ahaMoments);
    if (ahaMoments.length > 0) {
      return (
        <AHAMomentsDisplay
          ahaMoments={ahaMoments}
          onComplete={() => setPhase('story')}
        />
      );
    } else {
      // Skip AHA phase if no moments
      console.log('No AHA moments, skipping to story phase');
      setPhase('story');
    }
  }

  // Story Phase - Gratitude Story with Progressive Reveal
  if (phase === 'story') {
    const parsedContent = parseStoryContent(story);
    
    // Use enhanced chat for new dialogue format
    if (parsedContent.isNewFormat && parsedContent.dialogue) {
      return (
        <GratitudeStoryChatUltraEnhanced
          dialogueData={parsedContent}
          onComplete={() => setPhase('image')}
          onReset={onReset}
        />
      );
    }
    
    // Fallback to old chat for legacy format
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
        onComplete={() => {
          // Skip schedule phase, go to sign up
          setIsSignUpOpen(true);
        }}
        onReset={onReset}
      />
    );
  }

  // Show auth modal after image phase
  if (isSignUpOpen) {
    return (
      <div className="w-full max-w-3xl mx-auto">
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