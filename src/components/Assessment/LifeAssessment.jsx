import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { predefinedQuestions } from './questions';
import { generateQuestions } from '../../services/api';  // Updated import

const LifeAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [questions, setQuestions] = useState(predefinedQuestions);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const dreamLife = localStorage.getItem('dreamLife');
      if (!dreamLife) {
        setLoading(false);
        return;
      }

      try {
        const generatedQuestions = await generateQuestions(dreamLife);
        if (generatedQuestions) {
          // Ensure the response matches expected format
          const formattedQuestions = Array.isArray(generatedQuestions) 
            ? generatedQuestions
            : generatedQuestions.questions || [];

          // Map and format the questions
          const processedQuestions = formattedQuestions.map(q => ({
            ...q,
            id: `generated_${q.id}`
          }));
          
          setQuestions([...predefinedQuestions, ...processedQuestions]);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        // Fallback to predefined questions on error
        setQuestions(predefinedQuestions);
      }
      setLoading(false);
    };

    loadQuestions();
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value, // Updated to use question ID
      [questions[currentQuestion].question]: value // Keep for backward compatibility
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Store answers in localStorage
      localStorage.setItem('questionsAnswers', JSON.stringify(answers));
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
  };

  const generatePlan = () => {
    const dreamLife = localStorage.getItem('dreamLife');
    navigate('/dashboard', { 
      state: { 
        answers,
        dreamLife
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"/>
          <p className="text-gray-600">Preparing your assessment...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Assessment Complete</CardTitle>
            <CardDescription className="text-center mt-2">
              Ready to create your personalized roadmap to success
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-600">
              Your plan will include:
              <ul className="mt-2 space-y-1">
                <li>• Customized timeline and milestones</li>
                <li>• Resource recommendations</li>
                <li>• Action steps and strategies</li>
                <li>• Progress tracking tools</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="flex items-center gap-2"
            >
              Start Over
            </Button>
            <Button 
              onClick={generatePlan}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              Generate My Roadmap
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-gray-500 text-right">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              {currentQuestion + 1}
            </div>
            <div className="text-sm text-blue-600 font-medium">
              {currentQ.section}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                variant={answers[currentQ.id] === option.value ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-4 px-6 transition-all"
              >
                <div className="font-medium">
                  {option.label}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <div className="text-sm text-gray-500">
            {Math.round(progress)}% Complete
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LifeAssessment;