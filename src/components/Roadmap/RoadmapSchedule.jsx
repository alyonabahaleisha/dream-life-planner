// components/Roadmap/RoadmapSchedule.jsx
import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';

const Timeline = ({ steps }) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  return (
    <div className="relative mt-8">
      {/* Timeline Track */}
      <div className="absolute top-28 left-0 right-0 h-16 bg-blue-100 -z-10" />
      
      {/* Months */}
      <div className="grid grid-cols-12 gap-0">
        {months.map((month, index) => (
          <div 
            key={month}
            className={`text-center p-2 rounded-b-lg font-semibold ${
              getMonthColor(index)
            }`}
          >
            {month}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="relative pt-8 pb-16">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="absolute flex flex-col items-start"
            style={{
              left: `${(step.startMonth / 12) * 100}%`,
              width: `${((step.endMonth - step.startMonth) / 12) * 100}%`
            }}
          >
            <div className={`p-3 rounded-lg text-white mb-2 w-full ${getStepColor(step.phase)}`}>
              {step.title}
            </div>
            {step.milestones?.map((milestone, mIndex) => (
              <div 
                key={mIndex}
                className="text-sm text-gray-600 mt-2 bg-white p-2 rounded shadow-sm"
              >
                {milestone}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const getMonthColor = (index) => {
  const colors = [
    'bg-red-600 text-white',
    'bg-purple-500 text-white',
    'bg-purple-600 text-white',
    'bg-indigo-700 text-white',
    'bg-blue-700 text-white',
    'bg-blue-500 text-white',
    'bg-teal-500 text-white',
    'bg-green-500 text-white',
    'bg-lime-500 text-white',
    'bg-yellow-500 text-white',
    'bg-orange-500 text-white',
    'bg-red-500 text-white'
  ];
  return colors[index];
};

const getStepColor = (phase) => {
  const colors = {
    planning: 'bg-red-500',
    procurement: 'bg-purple-500',
    execution: 'bg-blue-600',
    completion: 'bg-orange-500'
  };
  return colors[phase] || 'bg-gray-500';
};

const RoadmapSchedule = ({ timelineData }) => {
  const roadmapSteps = [
    {
      title: 'Self-Assessment & Planning',
      phase: 'planning',
      startMonth: 0, // January
      endMonth: 2,
      milestones: ['Identify strengths', 'Address fears']
    },
    {
      title: 'Financial Planning & Skill Building',
      phase: 'procurement',
      startMonth: 2, // March
      endMonth: 5,
      milestones: ['Save 20% income', 'Complete key courses']
    },
    {
      title: 'Launch First Business',
      phase: 'execution',
      startMonth: 5, // June
      endMonth: 8,
      milestones: ['Business plan ready', 'First profitable month']
    },
    {
      title: 'Scale & Launch More',
      phase: 'execution',
      startMonth: 8, // September
      endMonth: 11,
      milestones: ['Second business launch', 'Work-life balance achieved']
    },
    {
      title: 'Final Goals',
      phase: 'completion',
      startMonth: 11, // December
      endMonth: 12,
      milestones: ['Dream house purchase', 'Millionaire status']
    }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Your Journey to Success
        </h2>
        <p className="text-center text-gray-600">
          Timeline for achieving your dream life goals
        </p>
      </CardHeader>
      <CardContent>
        <Timeline steps={timelineData || roadmapSteps} />
      </CardContent>
    </Card>
  );
};

export default RoadmapSchedule;