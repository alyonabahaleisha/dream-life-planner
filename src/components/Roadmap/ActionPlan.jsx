// components/Roadmap/ActionPlan.jsx
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Clock, 
  CheckCircle2, 
  Link, 
  Target,
  Tag
} from 'lucide-react';

const PriorityBadge = ({ priority }) => {
  const colors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  return (
    <Badge className={`${colors[priority]} text-xs font-medium`}>
      {priority} Priority
    </Badge>
  );
};

const CategoryBadge = ({ category }) => (
  <Badge className="bg-blue-100 text-blue-800 text-xs font-medium">
    {category}
  </Badge>
);

const TaskCard = ({ day, task, estimatedTime, priority, resources, metrics, category, milestone }) => (
  <Card className="p-6 hover:shadow-lg transition-all">
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {day}
          </div>
          <div className="space-x-2">
            <CategoryBadge category={category} />
            <PriorityBadge priority={priority} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {estimatedTime}
        </div>
      </div>

      {/* Task */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900">
          {task}
        </h3>
        
        {/* Milestone */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4 mt-1" />
          <div>
            <div className="font-medium">Contributing to:</div>
            <div>{milestone}</div>
          </div>
        </div>

        {/* Resources */}
        {resources?.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Link className="w-4 h-4 mt-1" />
            <div>
              <div className="font-medium">Resources Needed:</div>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                {resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Success Metrics */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 mt-1" />
          <div>
            <div className="font-medium">Success Metrics:</div>
            <div>{metrics}</div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const ScrollingRow = ({ days, direction = 'right' }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className={`inline-flex gap-4 whitespace-nowrap ${
          direction === 'left' ? 'scroll-reverse' : 'scroll-forward'
        }`}
      >
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square w-6 rounded-md ${
              day ? 'bg-blue-100' : 'bg-gray-100'
            } hover:opacity-75 transition-opacity cursor-pointer`}
            title={day ? `Day ${day.day}: ${day.task}` : `Day ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ActionPlan = ({ plan = [] }) => {
  // Split into weeks for the progress view
  const weeks = [];
  for (let i = 0; i < 30; i += 7) {
    weeks.push(Array(7).fill(null).map((_, index) => plan[i + index]));
  }

  return (
    <div>
      {/* Progress Overview */}
      <div className="mb-8 bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">30-Day Progress</h3>
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <ScrollingRow 
              key={weekIndex} 
              days={week}
              direction={weekIndex % 2 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="space-y-4">
        {plan.map((day) => (
          <TaskCard key={day.day} {...day} />
        ))}
      </div>
    </div>
  );
};

export default ActionPlan;