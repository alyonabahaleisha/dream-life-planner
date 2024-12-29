import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import {
  ChevronLeft,
  Target,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  LifeBuoy,
  ArrowUpRight,
  Laptop,
  Heart,
  Clock,
  Brain,
  Flag,
  Download,
  Save,
  ListTodo,
  CalendarRange,
  Users,
  Lightbulb,
  BarChart,
  TrendingUp
} from 'lucide-react';

import RoadmapContent from './RoadmapContent';
import RoadmapSchedule from './RoadmapSchedule';
import ActionPlan from './ActionPlan';
import { generateRoadmap, generateMilestones, generate30DayPlan } from '../services/openai';

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
  const [timelineData, setTimelineData] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [milestones, setMilestones] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(true);
  const [actionPlan, setActionPlan] = useState([]);
  const [loadingActionPlan, setLoadingActionPlan] = useState(true);
  const [defaultAccordionValue, setDefaultAccordionValue] = useState(['overview']);

  const quickLinks = [
    {
      icon: BarChart,
      title: "Financial Planning",
      description: "Track and plan your financial milestones",
      section: 'financial'
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Strategies for scaling your ventures",
      section: 'business'
    },
    {
      icon: Brain,
      title: "Skill Development",
      description: "Essential skills and learning paths",
      section: 'skills'
    },
    {
      icon: Heart,
      title: "Life Balance",
      description: "Balance personal and professional goals",
      section: 'balance'
    }
  ];

  const actionItems = [
    {
      id: 'financial-baseline',
      title: "Establish Financial Baseline",
      description: "Document current income, expenses, and savings targets"
    },
    {
      id: 'skills-assessment',
      title: "Skills Assessment",
      description: "Identify key skills needed for your dream career"
    },
    {
      id: 'business-plan',
      title: "Business Plan Development",
      description: "Create detailed business plan and timeline"
    },
    {
      id: 'network-building',
      title: "Network Building",
      description: "Connect with mentors and industry professionals"
    },
    {
      id: 'daily-routine',
      title: "Optimize Daily Routine",
      description: "Design schedule balancing all priorities"
    }
  ];

  const loadData = async () => {
    setLoadingMilestones(true);
    setLoadingActionPlan(true);
    const savedDreamLife = localStorage.getItem('dreamLife');
    
    try {
      // Load milestones
      const milestoneData = await generateMilestones(savedDreamLife, location.state?.answers || {});
      setMilestones(milestoneData);

      // Generate action plan based on milestones
      const actionPlanData = await generate30DayPlan(savedDreamLife, location.state?.answers || {}, milestoneData);
      setActionPlan(actionPlanData);

      // Load roadmap
      const roadmapResult = await generateRoadmap(savedDreamLife, location.state?.answers || {});
      if (roadmapResult) {
        setRoadmap(roadmapResult.content);
        setTimelineData(roadmapResult.timeline);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoadingMilestones(false);
      setLoadingActionPlan(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state?.answers) {
      setLoading(false);
      setLoadingMilestones(false);
      setLoadingActionPlan(false);
      return;
    }
    loadData();
  }, [location.state]);

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
    alert('Progress saved successfully!');
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
                Your Dream Life Roadmap
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

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Turn Your Vision Into Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized roadmap to achieving your dream life goals
          </p>
        </div>

        <Accordion 
          type="multiple" 
          defaultValue={defaultAccordionValue}
          className="w-full space-y-4"
        >
          {/* Overview Section */}
          <AccordionItem value="overview" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Your Dream Life Overview</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-600">
                  {roadmap}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Milestones Section */}
          <AccordionItem value="milestones" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5" />
                <span>Key Milestones</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadingMilestones ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse h-48" />
                  ))
                ) : (
                  milestones.map((milestone, index) => (
                    <MilestoneCard
                      key={index}
                      title={milestone.title}
                      timeframe={milestone.timeframe}
                      description={milestone.description}
                      progress={milestone.progress}
                    />
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 30-Day Action Plan */}
          <AccordionItem value="action-plan" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5" />
                <span>30-Day Action Plan</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              {loadingActionPlan ? (
                <div className="space-y-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse h-48" />
                  ))}
                </div>
              ) : (
                <ActionPlan plan={actionPlan} />
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Timeline Section */}
          <AccordionItem value="timeline" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <CalendarRange className="w-5 h-5" />
                <span>Timeline View</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <RoadmapSchedule timelineData={timelineData} />
            </AccordionContent>
          </AccordionItem>

          {/* Resources Section */}
          <AccordionItem value="resources" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>Quick Links & Resources</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <QuickLinkCard
                    key={index}
                    icon={link.icon}
                    title={link.title}
                    description={link.description}
                    onClick={() => setActiveSection(link.section)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Action Items */}
          <AccordionItem value="action-items" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Track Progress</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <div className="space-y-4">
                {actionItems.map((item) => (
                  <ActionItem
                    key={item.id} key={item.id}
                    title={item.title}
                    description={item.description}
                    isCompleted={completedItems[item.id] || false}
                    onToggle={() => {
                      setCompletedItems(prev => ({
                        ...prev,
                        [item.id]: !prev[item.id]
                      }));
                    }}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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