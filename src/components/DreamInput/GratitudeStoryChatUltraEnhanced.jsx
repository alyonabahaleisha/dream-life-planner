import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

const GratitudeStoryChatUltraEnhanced = ({ dialogueData, onComplete, onReset }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [currentSender, setCurrentSender] = useState('universe');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const [messageReactions, setMessageReactions] = useState({});
  const [showReactionAnimation, setShowReactionAnimation] = useState({});
  const chatContainerRef = useRef(null);
  
  // Use dialogue directly from API response
  const messages = dialogueData?.dialogue || [];
  const currentMessage = messages[currentMessageIndex];
  
  // Generate realistic typing indicator
  useEffect(() => {
    if (showTypingIndicator) {
      const interval = setInterval(() => {
        setTypingDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [showTypingIndicator]);
  
  // Format timestamp
  const getMessageTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
  // Process message text for special formatting
  const formatMessageText = (text) => {
    // Handle action descriptions like *takes a deep breath*
    return text.split(/(\*[^*]+\*)/).map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <span key={index} className="italic text-gray-500">{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };
  
  useEffect(() => {
    if (currentMessage) {
      setCurrentSender(currentMessage.speaker);
    }
  }, [currentMessage]);
  
  // Enhanced typing animation with variable speed
  useEffect(() => {
    if (currentMessage && !visibleMessages.find(m => m.id === currentMessageIndex)) {
      const typingTime = currentMessage.typing_time || 2.0;
      const timestampDelay = currentMessage.timestamp_delay || 0;
      
      // Show typing indicator for Universe
      if (currentMessage.speaker === 'universe') {
        setTimeout(() => {
          setShowTypingIndicator(true);
        }, timestampDelay * 1000);
      }
      
      // Start typing after indicator
      const typingDelay = currentMessage.speaker === 'universe' 
        ? (timestampDelay + typingTime) * 1000 
        : timestampDelay * 1000;
      
      const startTypingTimeout = setTimeout(() => {
        setShowTypingIndicator(false);
        setIsTyping(true);
        setTypedText('');
        setShowMoreButton(false);
        
        const text = currentMessage.text;
        let charIndex = 0;
        
        // Calculate typing speed based on message emotion and length
        const baseSpeed = currentMessage.speaker === 'universe' ? 40 : 30;
        const emotionMultiplier = {
          'excited': 0.7,
          'curious': 1.0,
          'tender': 1.3,
          'overwhelmed': 1.5,
          'playful': 0.8,
          'moved': 1.2
        };
        
        const typingSpeed = baseSpeed * (emotionMultiplier[currentMessage.emotion] || 1.0);
        
        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            setTypedText(text.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            
            // Add the message to visible messages
            const newMessage = {
              ...currentMessage,
              id: currentMessageIndex,
              timestamp: getMessageTime()
            };
            
            setVisibleMessages(prev => [...prev, newMessage]);
            
            // Show reactions after a short delay
            if (currentMessage.reactions && currentMessage.reactions.length > 0) {
              setTimeout(() => {
                setMessageReactions(prev => ({
                  ...prev,
                  [currentMessageIndex]: currentMessage.reactions
                }));
                
                // Animate reaction appearance
                setShowReactionAnimation(prev => ({
                  ...prev,
                  [currentMessageIndex]: true
                }));
              }, 500);
            }
            
            setShowMoreButton(true);
          }
        }, typingSpeed);
        
        return () => clearInterval(typingInterval);
      }, typingDelay);
      
      return () => {
        clearTimeout(startTypingTimeout);
        setShowTypingIndicator(false);
      };
    }
  }, [currentMessageIndex]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, typedText, showTypingIndicator]);
  
  // Auto-advance to next message
  useEffect(() => {
    if (showMoreButton && !isTyping) {
      const timer = setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex(currentMessageIndex + 1);
          setShowMoreButton(false);
        } else {
          // All messages shown, complete after a delay
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      }, 1500); // 1.5 second pause between messages
      
      return () => clearTimeout(timer);
    }
  }, [showMoreButton, isTyping, currentMessageIndex, messages.length, onComplete]);
  
  // Get message bubble style based on emotion and speaker
  const getMessageStyle = (message) => {
    if (message.speaker === 'universe') {
      return 'bg-gray-100 text-gray-800';
    }
    // User messages
    return 'bg-gray-700 text-white';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ height: '85vh', maxHeight: '800px' }}>
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-base">✨</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Universe</h3>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReset}
              className="text-gray-500 hover:bg-gray-100 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-white"
        >
          {visibleMessages.map((message) => (
            <div key={message.id} className="mb-4">
              {/* Timestamp - only show for first message or after 5+ minutes gap */}
              {message.id === 0 && (
                <div className="text-center mb-3">
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.speaker === 'universe' ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-end gap-2 max-w-[75%] ${
                  message.speaker === 'universe' ? '' : 'flex-row-reverse'
                }`}>
                  <div className="relative">
                    <div className={`rounded-2xl px-4 py-2 ${getMessageStyle(message)} ${
                      message.speaker === 'universe' 
                        ? 'rounded-tl-sm' 
                        : 'rounded-tr-sm'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {formatMessageText(message.text)}
                      </p>
                    </div>
                    
                    {/* Reactions */}
                    {messageReactions[message.id] && (
                      <div className={`absolute -bottom-1 ${
                        message.speaker === 'universe' ? 'left-2' : 'right-2'
                      } flex gap-0.5`}>
                        {messageReactions[message.id].map((reaction, idx) => (
                          <span 
                            key={idx} 
                            className={`text-xs opacity-60 ${showReactionAnimation[message.id] ? 'animate-pulse' : ''}`}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            {reaction}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Current message being typed */}
          {isTyping && currentMessage && (
            <div className="mb-4">
              
              <div className={`flex ${currentSender === 'universe' ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-end gap-2 max-w-[75%] ${
                  currentSender === 'universe' ? '' : 'flex-row-reverse'
                }`}>
                  <div className={`rounded-2xl px-4 py-2 ${getMessageStyle({
                    ...currentMessage,
                    speaker: currentSender
                  })} ${
                    currentSender === 'universe' 
                      ? 'rounded-tl-sm' 
                      : 'rounded-tr-sm'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {formatMessageText(typedText)}
                      <span className="inline-block w-1 h-4 bg-current animate-pulse ml-0.5" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Universe typing indicator */}
          {showTypingIndicator && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[60px]">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          {/* Universe Whispers */}
          {!isTyping && !showTypingIndicator && visibleMessages.length === messages.length && dialogueData?.universeWhispers && (
            <div className="mt-8 mb-4 mx-auto max-w-[90%]">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-xs font-medium text-gray-600 mb-3 text-center uppercase tracking-wider">Universe Whispers</h3>
                <div className="space-y-2">
                  {dialogueData.universeWhispers.map((whisper, index) => (
                    <p key={index} className="text-gray-600 italic text-xs text-center leading-relaxed">
                      {whisper}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GratitudeStoryChatUltraEnhanced;