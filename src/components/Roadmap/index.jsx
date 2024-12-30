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
} from '../../services/openai';

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
  const [completedItems, setCompletedItems] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [milestones, setMilestones] = useState([]);
  const [actionPlan, setActionPlan] = useState([]);
  const [values, setValues] = useState(null);
  const [defaultAccordionValue, setDefaultAccordionValue] = useState([]);

  useEffect(() => {
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

    // Load milestones first
    generateMilestones(savedDreamLife, answers)
      .then(milestoneData => {
        setMilestones(milestoneData);
        setLoadingStates(prev => ({ ...prev, milestones: false }));

        // Once milestones are loaded, generate action plan
        return generate30DayPlan(savedDreamLife, answers, milestoneData);
      })
      .then(actionPlanData => {
        setActionPlan(actionPlanData);
        setLoadingStates(prev => ({ ...prev, actionPlan: false }));
      })
      .catch(error => {
        console.error('Error loading milestones or action plan:', error);
        setLoadingStates(prev => ({
          ...prev,
          milestones: false,
          actionPlan: false
        }));
      });

    // Load roadmap independently
    generateRoadmap(savedDreamLife, answers)
      .then(result => {
        if (result) {
          setRoadmap(result.content);
          setTimelineData(result.timeline);
        }
        setLoadingStates(prev => ({
          ...prev,
          roadmap: false,
          timeline: false
        }));
      })
      .catch(error => {
        console.error('Error loading roadmap:', error);
        setLoadingStates(prev => ({
          ...prev,
          roadmap: false,
          timeline: false
        }));
      });

    // Load values transition independently
    generateValuesTransition(savedDreamLife, answers)
      .then(valuesData => {
        setValues(valuesData);
        setLoadingStates(prev => ({
          ...prev,
          values: false
        }));
      })
      .catch(error => {
        console.error('Error loading values transition:', error);
        setLoadingStates(prev => ({
          ...prev,
          values: false
        }));
      });
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

  const handleToggleItem = (itemId) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

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