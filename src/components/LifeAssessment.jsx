import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, User, Briefcase, Heart, Clock, Target, Rocket } from 'lucide-react';

const questions = [
  // Personal Information
  {
    id: 'gender',
    section: 'Personal Information',
    question: "How do you identify?",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Non-binary", value: "non_binary" },
      { label: "Prefer not to say", value: "prefer_not_say" }
    ]
  },
  {
    id: 'age',
    section: 'Personal Information',
    question: "What is your age range?",
    options: [
      { label: "18-24", value: "18-24" },
      { label: "25-34", value: "25-34" },
      { label: "35-44", value: "35-44" },
      { label: "45-54", value: "45-54" },
      { label: "55+", value: "55+" }
    ]
  },
  {
    id: 'location_type',
    section: 'Personal Information',
    question: "What type of area do you live in?",
    options: [
      { label: "Urban (Big city)", value: "urban" },
      { label: "Suburban", value: "suburban" },
      { label: "Rural", value: "rural" },
      { label: "Small town", value: "small_town" }
    ]
  },
  // Work and Career
  {
    id: 'employment',
    section: 'Work and Career',
    question: "What best describes your current employment situation?",
    options: [
      { label: "Full-time employee", value: "full_time" },
      { label: "Part-time employee", value: "part_time" },
      { label: "Self-employed/Freelancer", value: "self_employed" },
      { label: "Business owner", value: "business_owner" },
      { label: "Not currently employed", value: "unemployed" }
    ]
  },
  {
    id: 'work_arrangement',
    section: 'Work and Career',
    question: "What's your current work arrangement?",
    options: [
      { label: "Fully remote", value: "remote" },
      { label: "Hybrid (mix of remote and office)", value: "hybrid" },
      { label: "Office-based", value: "office" },
      { label: "Field work/Variable location", value: "field" }
    ]
  },
  {
    id: 'income',
    section: 'Work and Career',
    question: "What is your approximate annual income?",
    options: [
      { label: "Under $30,000", value: "under_30k" },
      { label: "$30,000 - $60,000", value: "30k_60k" },
      { label: "$60,000 - $100,000", value: "60k_100k" },
      { label: "$100,000 - $150,000", value: "100k_150k" },
      { label: "Over $150,000", value: "over_150k" }
    ]
  },
  // Family and Relationships
  {
    id: 'relationship',
    section: 'Family and Relationships',
    question: "What's your current relationship status?",
    options: [
      { label: "Single", value: "single" },
      { label: "In a relationship", value: "relationship" },
      { label: "Married", value: "married" },
      { label: "Divorced/Separated", value: "divorced" },
      { label: "Prefer not to say", value: "prefer_not_say" }
    ]
  },
  {
    id: 'children',
    section: 'Family and Relationships',
    question: "Do you have children?",
    options: [
      { label: "No children", value: "none" },
      { label: "Yes, young children (0-12)", value: "young" },
      { label: "Yes, teenagers (13-18)", value: "teens" },
      { label: "Yes, adult children", value: "adult" },
      { label: "Prefer not to say", value: "prefer_not_say" }
    ]
  },
  // Side Hustles and Entrepreneurship
  {
    id: 'side_hustle',
    section: 'Side Hustles',
    question: "Do you currently have any side hustles or additional income streams?",
    options: [
      { label: "No side hustles currently", value: "none" },
      { label: "Yes, earning some extra income", value: "active" },
      { label: "Planning to start soon", value: "planning" },
      { label: "Interested but haven't started", value: "interested" }
    ]
  },
  // Time Management
  {
    id: 'free_time',
    section: 'Time Management',
    question: "How much free time do you typically have per day?",
    options: [
      { label: "Less than 1 hour", value: "less_1" },
      { label: "1-2 hours", value: "1_2" },
      { label: "2-4 hours", value: "2_4" },
      { label: "4+ hours", value: "4_plus" }
    ]
  },
  {
    id: 'time_challenge',
    section: 'Time Management',
    question: "What's your biggest challenge with time management?",
    options: [
      { label: "Too many responsibilities", value: "responsibilities" },
      { label: "Poor work-life balance", value: "work_life" },
      { label: "Procrastination", value: "procrastination" },
      { label: "Lack of planning", value: "planning" },
      { label: "Distractions", value: "distractions" }
    ]
  },
  // Aspirations and Goals
  {
    id: 'primary_goal',
    section: 'Aspirations',
    question: "What's your primary goal for the next year?",
    options: [
      { label: "Career advancement", value: "career" },
      { label: "Financial growth", value: "financial" },
      { label: "Better work-life balance", value: "balance" },
      { label: "Start a business", value: "business" },
      { label: "Personal development", value: "personal" }
    ]
  },
  {
    id: 'biggest_obstacle',
    section: 'Aspirations',
    question: "What's your biggest obstacle in achieving your goals?",
    options: [
      { label: "Lack of time", value: "time" },
      { label: "Financial constraints", value: "financial" },
      { label: "Limited knowledge/skills", value: "skills" },
      { label: "Fear of failure", value: "fear" },
      { label: "Lack of support", value: "support" }
    ]
  }
];

const sections = {
  'Personal Information': <User className="h-5 w-5" />,
  'Work and Career': <Briefcase className="h-5 w-5" />,
  'Family and Relationships': <Heart className="h-5 w-5" />,
  'Side Hustles': <Rocket className="h-5 w-5" />,
  'Time Management': <Clock className="h-5 w-5" />,
  'Aspirations': <Target className="h-5 w-5" />
};

const LifeAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
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
    // Here you would generate the plan based on answers
    console.log('Generating plan with answers:', answers);
    // Navigate to plan view or show modal with next steps
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Ready to Transform Your Life</CardTitle>
            <CardDescription className="text-center mt-2">
              Based on your responses, we'll create your personalized roadmap to your dream life.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-600">
              Your personalized plan will include:
              <ul className="mt-2 space-y-1">
                <li>• Step-by-step action plan</li>
                <li>• Timeline for achieving goals</li>
                <li>• Resource recommendations</li>
                <li>• Progress tracking tools</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleRestart} variant="outline">
              Start Over
            </Button>
            <Button 
              onClick={generatePlan}
              className="bg-blue-600 hover:bg-blue-700"
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
            {sections[currentQ.section] && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                {sections[currentQ.section]}
              </div>
            )}
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