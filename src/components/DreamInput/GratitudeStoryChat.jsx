import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

const GratitudeStoryChat = ({ story, onComplete, onReset }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [currentSender, setCurrentSender] = useState('universe');
  
  // Create conversation with Universe greeting first
  const createConversation = (storyText) => {
    const lines = storyText.split('\n').filter(line => line.trim());
    const messages = [];
    
    // Universe greeting
    messages.push({
      id: 0,
      sender: 'universe',
      text: "Hey my dear, how are you?",
      isSpecial: true
    });
    
    // Split user's story into smaller messages
    let messageId = 1;
    let currentSection = [];
    
    lines.forEach((line, index) => {
      currentSection.push(line);
      
      // Create new message after 1-2 lines or at natural breaks
      if (currentSection.length >= 2 || 
          line.includes('Thank you') ||
          line.includes('.') && currentSection.length >= 1 ||
          index === lines.length - 1) {
        
        messages.push({
          id: messageId++,
          sender: 'user',
          text: currentSection.join('\n'),
          isGratitude: currentSection.some(l => l.includes('Thank you')),
          isSpecial: currentSection.some(l => l.includes('It feels so good')) || 
                     index === lines.length - 1
        });
        currentSection = [];
      }
    });
    
    return messages;
  };
  
  const messages = createConversation(story);
  const currentMessage = messages[currentMessageIndex];
  
  useEffect(() => {
    if (currentMessage) {
      setCurrentSender(currentMessage.sender);
    }
  }, [currentMessage]);
  
  // Start typing animation on mount or when message changes
  useEffect(() => {
    if (currentMessage && !visibleMessages.find(m => m.id === currentMessage.id)) {
      setIsTyping(true);
      setTypedText('');
      setShowMoreButton(false);
      
      // Add delay for user messages to simulate thinking
      const delay = currentMessage.sender === 'user' ? 1000 : 500;
      
      const timeoutId = setTimeout(() => {
        const text = currentMessage.text;
        let charIndex = 0;
        
        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            setTypedText(text.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setVisibleMessages(prev => [...prev, currentMessage]);
            setShowMoreButton(true);
          }
        }, currentMessage.sender === 'universe' ? 50 : 30); // Universe types slower
        
        return () => clearInterval(typingInterval);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentMessageIndex]);
  
  // Start with Universe message on mount
  useEffect(() => {
    if (messages.length > 0 && visibleMessages.length === 0 && currentMessageIndex === 0) {
      // Start the conversation
      setCurrentMessageIndex(0);
    }
  }, []);
  
  const handleMore = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      onComplete();
    }
  };
  
  // Auto-scroll to bottom
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [typedText, visibleMessages]);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg">✨</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Universe</h3>
              <p className="text-xs text-gray-500">Sharing your gratitude story...</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Chat Messages */}
        <div 
          id="chat-container"
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Completed messages */}
          {visibleMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex gap-3 animate-fadeIn ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {message.sender === 'universe' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm">✨</span>
                </div>
              )}
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">👤</span>
                </div>
              )}
              <div className={`rounded-2xl px-4 py-3 max-w-lg ${
                message.sender === 'user' 
                  ? message.isGratitude 
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100' 
                    : 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}>
                <p className={`whitespace-pre-wrap ${
                  message.isSpecial ? 'text-lg font-light' : 'text-base'
                } ${
                  message.sender === 'universe' ? 'text-gray-700' : 
                  message.isGratitude ? 'text-purple-900' : ''
                }`}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          
          {/* Currently typing message */}
          {isTyping && currentMessage && (
            <div className={`flex gap-3 ${
              currentMessage.sender === 'user' ? 'flex-row-reverse' : ''
            }`}>
              {currentMessage.sender === 'universe' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm">✨</span>
                </div>
              )}
              {currentMessage.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">👤</span>
                </div>
              )}
              <div className={`rounded-2xl px-4 py-3 max-w-lg ${
                currentMessage.sender === 'user' 
                  ? currentMessage.isGratitude 
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100' 
                    : 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}>
                <p className={`whitespace-pre-wrap ${
                  currentMessage.isSpecial ? 'text-lg font-light' : 'text-base'
                } ${
                  currentMessage.sender === 'universe' ? 'text-gray-700' : 
                  currentMessage.isGratitude ? 'text-purple-900' : ''
                }`}>
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          )}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className={`flex gap-3 ${currentSender === 'user' ? 'justify-end' : ''}`}>
              {currentSender === 'universe' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm">✨</span>
                </div>
              )}
              <div className="bg-gray-200 rounded-full px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* More button */}
        {showMoreButton && !isTyping && (
          <div className="bg-white border-t border-gray-200 p-4">
            <Button
              onClick={handleMore}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentMessageIndex < messages.length - 1 
                ? 'More...' 
                : '✨ Continue to Your Schedule'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeStoryChat;