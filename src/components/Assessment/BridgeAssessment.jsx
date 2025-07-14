import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BridgeAssessment = ({ dreamData, questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animateIn, setAnimateIn] = useState(true);
  
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  // Get current question data
  const question = questions[currentQuestion];
  
  const handleAnswer = (answerId) => {
    setAnswers({ ...answers, [question.id]: answerId });
    
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        handleNext();
      } else {
        // Assessment complete
        onComplete(answers);
      }
    }, 300);
  };
  
  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setAnimateIn(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setAnimateIn(true);
      }, 200);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setAnimateIn(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnimateIn(true);
      }, 200);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header with Bridge Progress */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">Building Your Bridge</h3>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
          
          {/* Bridge Progress Visualization */}
          <div className="relative h-12">
            {/* Bridge structure */}
            <div className="absolute inset-x-0 top-6 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-gray-700 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Bridge pillars */}
            {[...Array(totalQuestions)].map((_, idx) => {
              const position = ((idx + 1) / totalQuestions) * 100;
              const isPassed = currentQuestion >= idx;
              return (
                <div
                  key={idx}
                  className={`absolute top-4 w-0.5 h-4 transition-colors duration-300 ${
                    isPassed ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  style={{ left: `${position}%` }}
                />
              );
            })}
            
            {/* Walking figure */}
            <div 
              className="absolute top-5 w-3 h-3 bg-white border-2 border-purple-500 rounded-full shadow-sm transition-all duration-500"
              style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
            />
          </div>
        </div>
      </div>
      
      {/* Question Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className={`transition-all duration-300 ${
          animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {/* Question Category */}
          {question.category && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {question.category}
              </span>
            </div>
          )}
          
          {/* Question Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {question.text}
          </h2>
          
          {/* Question Description */}
          {question.description && (
            <p className="text-gray-600 mb-8">
              {question.description}
            </p>
          )}
          
          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option.id;
              return (
                <button
                  key={option.id || idx}
                  onClick={() => handleAnswer(option.id || idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{option.text}</p>
                      {option.subtext && (
                        <p className="text-sm text-gray-500 mt-1">{option.subtext}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Navigation (for going back) */}
        <div className="flex justify-between items-center mt-12">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="text-gray-600"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          {/* Skip option for optional questions */}
          {question.optional && !answers[question.id] && (
            <Button
              variant="ghost"
              onClick={handleNext}
              className="text-gray-500"
            >
              Skip this question
            </Button>
          )}
        </div>
      </div>
      
      {/* Motivational footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4">
        <p className="text-center text-sm text-gray-500">
          {currentQuestion < totalQuestions - 1 
            ? "Each answer builds your bridge stronger 🌉"
            : "Almost there! Your roadmap is waiting 🗺️"
          }
        </p>
      </div>
    </div>
  );
};

export default BridgeAssessment;