import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

const GratitudeStoryChatEnhanced = ({ dialogueData, onComplete, onReset }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [currentSender, setCurrentSender] = useState('universe');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [messageReactions, setMessageReactions] = useState({});
  const [showReactionAnimation, setShowReactionAnimation] = useState({});
  
  // Use dialogue directly from API response
  const messages = dialogueData?.dialogue || [];
  const currentMessage = messages[currentMessageIndex];
  
  useEffect(() => {
    if (currentMessage) {
      setCurrentSender(currentMessage.speaker);
    }
  }, [currentMessage]);
  
  // Start typing animation on mount or when message changes
  useEffect(() => {
    if (currentMessage && !visibleMessages.find(m => m.id === currentMessageIndex)) {
      setIsTyping(true);
      setTypedText('');
      setShowMoreButton(false);
      
      // Add delay based on emotion and speaker
      const getDelay = () => {
        if (currentMessage.speaker === 'universe') return 500;
        if (currentMessage.emotion === 'overwhelmed') return 1500;
        if (currentMessage.emotion === 'awe') return 1200;
        return 1000;
      };
      
      const delay = getDelay();
      
      const timeoutId = setTimeout(() => {
        const text = currentMessage.text;
        let charIndex = 0;
        
        // Typing speed varies by emotion
        const getTypingSpeed = () => {
          if (currentMessage.emotion === 'divine_love') return 60;
          if (currentMessage.emotion === 'gentle_curiosity') return 50;
          if (currentMessage.emotion === 'overwhelmed') return 25;
          if (currentMessage.emotion === 'awe') return 35;
          return currentMessage.speaker === 'universe' ? 50 : 30;
        };
        
        const typingSpeed = getTypingSpeed();
        
        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            setTypedText(text.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setVisibleMessages(prev => [...prev, {
              ...currentMessage,
              id: currentMessageIndex
            }]);
            setShowMoreButton(true);
          }
        }, typingSpeed);
        
        return () => clearInterval(typingInterval);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentMessageIndex]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [visibleMessages, typedText]);
  
  const handleShowMore = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      setShowMoreButton(false);
    } else {
      onComplete();
    }
  };
  
  const isLastMessage = currentMessageIndex === messages.length - 1;
  
  // Special styling for different emotions
  const getMessageStyle = (message) => {
    if (message.speaker === 'universe') {
      if (message.emotion === 'divine_love') {
        return 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200';
      }
      return 'bg-white';
    }
    
    // User messages
    if (message.emotion === 'awe' || message.emotion === 'overwhelmed') {
      return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
    }
    if (message.text.includes('Thank you')) {
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    }
    return 'bg-blue-500 text-white';
  };
  
  const getEmotionIndicator = (emotion) => {
    const indicators = {
      'divine_love': '✨',
      'gentle_curiosity': '🌟',
      'overwhelmed': '🙏',
      'awe': '💫',
      'profound_relief': '🕊️',
      'deep_peace': '🌸'
    };
    return indicators[emotion] || '';
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">A Conversation with the Universe</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReset}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-2 text-purple-100">Your divine dialogue about dreams come true</p>
        </div>
        
        <div className="chat-container h-[600px] overflow-y-auto p-6 bg-gray-50">
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.speaker === 'universe' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${
                message.speaker === 'universe' ? '' : 'flex-row-reverse'
              }`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.speaker === 'universe' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-blue-500'
                }`}>
                  <span className="text-white text-xl">
                    {message.speaker === 'universe' ? '✨' : '👤'}
                  </span>
                </div>
                <div>
                  <div className={`rounded-2xl px-4 py-3 ${getMessageStyle(message)} ${
                    message.speaker === 'universe' ? 'rounded-tl-none' : 'rounded-tr-none'
                  }`}>
                    <p className={`whitespace-pre-wrap ${
                      message.emotion === 'divine_love' ? 'text-purple-800 font-medium' : ''
                    }`}>
                      {message.text}
                    </p>
                  </div>
                  {message.emotion && (
                    <span className="text-xs text-gray-500 mt-1 block text-center">
                      {getEmotionIndicator(message.emotion)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && currentMessage && (
            <div className={`mb-4 flex ${currentSender === 'universe' ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex items-start gap-3 max-w-[80%] ${
                currentSender === 'universe' ? '' : 'flex-row-reverse'
              }`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  currentSender === 'universe' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-blue-500'
                }`}>
                  <span className="text-white text-xl">
                    {currentSender === 'universe' ? '✨' : '👤'}
                  </span>
                </div>
                <div className={`rounded-2xl px-4 py-3 ${getMessageStyle({
                  ...currentMessage,
                  speaker: currentSender
                })} ${
                  currentSender === 'universe' ? 'rounded-tl-none' : 'rounded-tr-none'
                }`}>
                  <p className={`whitespace-pre-wrap ${
                    currentMessage.emotion === 'divine_love' ? 'text-purple-800 font-medium' : ''
                  }`}>
                    {typedText}
                    <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1" />
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!isTyping && currentSender === 'universe' && visibleMessages.length > 0 && !showMoreButton && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 rounded-full px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {showMoreButton && (
          <div className="p-4 bg-white border-t">
            <Button 
              onClick={handleShowMore}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isLastMessage ? 'Continue Your Journey' : 'Continue...'}
            </Button>
          </div>
        )}
      </div>
      
      {/* Display Universe Whispers if we're done */}
      {!showMoreButton && visibleMessages.length === messages.length && dialogueData?.universeWhispers && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Universe Whispers for Your Journey</h3>
          <div className="space-y-2">
            {dialogueData.universeWhispers.map((whisper, index) => (
              <p key={index} className="text-purple-700 italic flex items-start gap-2">
                <span className="text-purple-500">✦</span>
                {whisper}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeStoryChatEnhanced;