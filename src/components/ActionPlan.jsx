import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Clock, 
  CheckCircle2, 
  Link, 
  Target,
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
        {resources.length > 0 && (
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

const DailyPlan = ({ plan }) => {
  return (
    <div>
      {/* Progress Overview */}
      <div className="mb-8 bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">30-Day Progress</h3>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 30 }).map((_, index) => {
            const dayPlan = plan[index];
            return (
              <div
                key={index}
                className={`aspect-square rounded-md ${
                  dayPlan ? 'bg-blue-100' : 'bg-gray-100'
                } hover:opacity-75 transition-opacity cursor-pointer`}
                title={dayPlan ? `Day ${dayPlan.day}: ${dayPlan.task}` : `Day ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="space-y-4">
        {plan.map((dayPlan) => (
          <TaskCard key={dayPlan.day} {...dayPlan} />
        ))}
      </div>
    </div>
  );
};

export default DailyPlan;