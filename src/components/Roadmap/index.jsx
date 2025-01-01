// components/Roadmap/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import RoadmapHeader from './RoadmapHeader';
import RoadmapAccordion from './RoadmapAccordion';
import { QUICK_LINKS, ACTION_ITEMS } from './constants';
import { 
  generateRoadmap, 
  generateMilestones, 
  generate30DayPlan,
  generateValuesTransition 
} from '../../services/api';  // Updated import

const Roadmap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingStates, setLoadingStates] = useState({
    roadmap: true,
    milestones: true,
    actionPlan: true,
    timeline: true,
    values: true
  });
  const [roadmap, setRoadmap] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem('completedItems');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeSection, setActiveSection] = useState('overview');
  const [milestones, setMilestones] = useState([]);
  const [actionPlan, setActionPlan] = useState([]);
  const [values, setValues] = useState(null);
  const [defaultAccordionValue, setDefaultAccordionValue] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeRoadmap = async () => {
      if (!location.state?.answers) {
        setLoadingStates({
          roadmap: false,
          milestones: false,
          actionPlan: false,
          timeline: false,
          values: false
        });
        return;
      }

      const savedDreamLife = localStorage.getItem('dreamLife');
      const answers = location.state?.answers || {};

      try {
        // Generate milestones and action plan sequentially
        const milestoneData = await generateMilestones(savedDreamLife, answers);
        setMilestones(milestoneData);
        setLoadingStates(prev => ({ ...prev, milestones: false }));

        const actionPlanData = await generate30DayPlan(savedDreamLife, answers, milestoneData);
        setActionPlan(actionPlanData);
        setLoadingStates(prev => ({ ...prev, actionPlan: false }));

        // Generate roadmap and values transition in parallel
        const [roadmapResult, valuesData] = await Promise.all([
          generateRoadmap(savedDreamLife, answers),
          generateValuesTransition(savedDreamLife, answers)
        ]);

        if (roadmapResult) {
          setRoadmap(roadmapResult.content);
          setTimelineData(roadmapResult.timeline);
        }
        setValues(valuesData);

        setLoadingStates(prev => ({
          ...prev,
          roadmap: false,
          timeline: false,
          values: false
        }));
      } catch (error) {
        console.error('Error initializing roadmap:', error);
        setError('Failed to generate roadmap content. Please try again.');
        setLoadingStates({
          roadmap: false,
          milestones: false,
          actionPlan: false,
          timeline: false,
          values: false
        });
      }
    };

    initializeRoadmap();
  }, [location.state]);

  const handleDownload = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([roadmap], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = 'my-dream-life-roadmap.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error downloading roadmap:', error);
      alert('Failed to download roadmap. Please try again.');
    }
  };

  const handleSaveProgress = () => {
    try {
      localStorage.setItem('completedItems', JSON.stringify(completedItems));
      alert('Progress saved successfully!');
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Failed to save progress. Please try again.');
    }
  };

  const handleToggleItem = (itemId) => {
    setCompletedItems(prev => {
      const updated = {
        ...prev,
        [itemId]: !prev[itemId]
      };
      // Save to localStorage whenever items are toggled
      localStorage.setItem('completedItems', JSON.stringify(updated));
      return updated;
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <h2 className="text-2xl font-semibold text-gray-900">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <RoadmapHeader 
        onBack={() => navigate(-1)}
        onSave={handleSaveProgress}
        onDownload={handleDownload}
        isDownloadDisabled={loadingStates.roadmap}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Turn Your Vision Into Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized roadmap to achieving your dream life goals
          </p>
        </div>

        <RoadmapAccordion 
          loadingStates={loadingStates}
          roadmap={roadmap}
          milestones={milestones}
          actionPlan={actionPlan}
          timelineData={timelineData}
          values={values}
          quickLinks={QUICK_LINKS}
          actionItems={ACTION_ITEMS}
          completedItems={completedItems}
          defaultValue={defaultAccordionValue}
          onSectionChange={setActiveSection}
          onToggleItem={handleToggleItem}
        />

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