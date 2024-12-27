import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  ChevronLeft,
  Target,
  Calendar,
  ArrowRight,
  CheckCircle2,
  LifeBuoy,
  ArrowUpRight,
  Laptop,
  Heart,
  Clock,
  Brain,
  Flag,
  AlertCircle,
  Download,
  Save
} from 'lucide-react';

import RoadmapContent from './RoadmapContent';
import RoadmapSchedule from './RoadmapSchedule';
import { generateRoadmap } from '../services/openai';

const MilestoneCard = ({ title, timeframe, description, progress }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <span className="text-sm text-blue-600 font-medium">{timeframe}</span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="text-sm text-gray-500 text-right">{progress}% Complete</div>
    </div>
  </div>
);

const QuickLinkCard = ({ icon: Icon, title, description, onClick }) => (
  <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-gray-400" />
      </div>
    </CardContent>
  </Card>
);

const ActionItem = ({ title, description, isCompleted, onToggle }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={onToggle}
      className="mt-1"
    />
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const Roadmap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  
  useEffect(() => {
    const loadRoadmap = async () => {
      if (!location.state?.answers) {
        setLoading(false);
        return;
      }

      try {
        const savedDreamLife = localStorage.getItem('dreamLife');
        const roadmapContent = await generateRoadmap(savedDreamLife, location.state.answers);
        if (roadmapContent) {
          setRoadmap(roadmapContent);
        } else {
          console.error('Failed to generate roadmap');
        }
      } catch (error) {
        console.error('Error generating roadmap:', error);
      }
      setLoading(false);
    };

    loadRoadmap();
  }, [location.state]);

  const quickLinks = [
    {
      icon: Laptop,
      title: "Business Development",
      description: "Steps to establish and grow your online ventures",
      section: 'business'
    },
    {
      icon: Heart,
      title: "Life Balance",
      description: "Strategies for managing work, family, and personal growth",
      section: 'balance'
    },
    {
      icon: Brain,
      title: "Skill Development",
      description: "Essential skills and learning resources",
      section: 'skills'
    },
    {
      icon: Flag,
      title: "Milestones",
      description: "Key achievements to target in your journey",
      section: 'milestones'
    }
  ];

  const actionItems = [
    {
      id: 'research',
      title: "Market Research",
      description: "Identify profitable niches and analyze competition"
    },
    {
      id: 'skills',
      title: "Skill Assessment",
      description: "Evaluate current skills and plan necessary improvements"
    },
    {
      id: 'plan',
      title: "Business Plan",
      description: "Create detailed plan for first online business"
    },
    {
      id: 'schedule',
      title: "Daily Schedule",
      description: "Design optimal daily routine balancing all responsibilities"
    }
  ];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([roadmap], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'my-dream-life-roadmap.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveProgress = () => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"/>
          <p className="text-gray-600">Creating your personalized roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="text-xl font-medium text-gray-900">
                Achieve Your Dream Life
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleSaveProgress}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Turn Your Vision Into Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized roadmap to building a successful online business empire while maintaining work-life balance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <QuickLinkCard 
              key={index} 
              {...link} 
              onClick={() => setActiveSection(link.section)}
            />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {actionItems.map((item) => (
              <ActionItem
                key={item.id}
                {...item}
                isCompleted={completedItems[item.id]}
                onToggle={() => setCompletedItems(prev => ({
                  ...prev,
                  [item.id]: !prev[item.id]
                }))}
              />
            ))}
          </CardContent>
        </Card>

        <RoadmapSchedule />
        <RoadmapContent />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MilestoneCard
              title="6-Month Goals"
              timeframe="Short Term"
              description="Launch first online business and establish consistent routines"
              progress={15}
            />
            <MilestoneCard
              title="1-Year Goals"
              timeframe="Medium Term"
              description="Scale first business and launch second venture"
              progress={5}
            />
            <MilestoneCard
              title="3-5 Year Vision"
              timeframe="Long Term"
              description="Build multiple income streams and achieve location independence"
              progress={0}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Detailed Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-600">
                {roadmap}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-8">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;