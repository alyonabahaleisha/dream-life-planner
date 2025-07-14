import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateBlueprint } from '../../services/api';
import DashboardHeader from './DashboardHeader';
import DashboardNavigation from './DashboardNavigation';
import MilestoneTimeline from './MilestoneTimeline';
import SprintPlan from './SprintPlan';
import DailyRoutines from './DailyRoutines';
import MindsetShifts from './MindsetShifts';
import IdentityEvolution from './IdentityEvolution';
import DashboardActions from './DashboardActions';
import LoadingScreen from '../DreamInput/LoadingScreen';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';

const DreamDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  // Get data from assessment
  const dreamDescription = localStorage.getItem('dreamLife');
  const assessmentAnswers = location.state?.answers || JSON.parse(localStorage.getItem('questionsAnswers') || '{}');

  useEffect(() => {
    if (!dreamDescription) {
      navigate('/');
      return;
    }

    generateDreamBlueprint();
  }, [dreamDescription]);

  const generateDreamBlueprint = async () => {
    try {
      setLoading(true);
      setError(null);

      // Transform assessment answers into structured data
      const assessmentData = {
        currentSituation: assessmentAnswers['What best describes your current situation?'] || 'Starting fresh',
        timeAvailable: assessmentAnswers['How much time can you dedicate to this dream daily?'] || '2-3 hours',
        resources: assessmentAnswers['What resources do you currently have?'] || 'Limited budget',
        experience: assessmentAnswers['What\'s your experience level in this area?'] || 'Beginner',
        timeline: assessmentAnswers['When do you want to achieve this dream?'] || 'Within 2 years'
      };

      const result = await generateBlueprint(dreamDescription, assessmentData);
      
      if (result) {
        setBlueprint(result);
        // Store blueprint for future visits
        localStorage.setItem('dreamBlueprint', JSON.stringify(result));
      }
    } catch (err) {
      console.error('Error generating blueprint:', err);
      setError('Failed to generate your dream blueprint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"/>
          <p className="text-gray-600">Creating your personalized blueprint...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Oops, something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <Button 
              onClick={generateDreamBlueprint}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => navigate('/assessment')}
              variant="outline"
              className="w-full"
            >
              Back to Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!blueprint) {
    return null;
  }

  const sections = [
    { id: 0, name: 'Milestones', icon: '🎯' },
    { id: 1, name: '90-Day Plan', icon: '📅' },
    { id: 2, name: 'Daily Routines', icon: '🔄' },
    { id: 3, name: 'Mindset Shifts', icon: '🧠' },
    { id: 4, name: 'Identity Path', icon: '✨' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader dreamSummary={dreamDescription} />
      
      <DashboardNavigation 
        sections={sections}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeSection === 0 && (
            <MilestoneTimeline milestones={blueprint.milestones} />
          )}
          
          {activeSection === 1 && (
            <SprintPlan sprintPlan={blueprint.sprintPlan} />
          )}
          
          {activeSection === 2 && (
            <DailyRoutines routines={blueprint.dailyRoutines} />
          )}
          
          {activeSection === 3 && (
            <MindsetShifts shifts={blueprint.mindsetShifts} />
          )}
          
          {activeSection === 4 && (
            <IdentityEvolution evolution={blueprint.identityEvolution} />
          )}
        </div>

        <DashboardActions 
          onSave={() => {
            // TODO: Implement save functionality
            console.log('Saving blueprint...');
          }}
          onStart={() => {
            // TODO: Implement start journey functionality
            console.log('Starting journey...');
          }}
        />
      </div>
    </div>
  );
};

export default DreamDashboard;