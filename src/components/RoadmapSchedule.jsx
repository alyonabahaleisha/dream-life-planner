import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { DollarSign, TrendingUp, Users, Clock, Lightbulb } from 'lucide-react';

const ProcessRow = ({ process, years, icon: Icon, color }) => (
  <div className="flex items-stretch border-b border-gray-100 last:border-0">
    <div className={`w-48 p-4 ${color} text-white font-medium flex items-center gap-2`}>
      <Icon className="w-5 h-5" />
      {process}
    </div>
    <div className="flex-1 grid grid-cols-6">
      {years.map((content, i) => (
        <div 
          key={i}
          className={`p-4 ${content ? `${color} bg-opacity-10` : ''} border-l border-gray-200`}
        >
          {content && (
            <>
              <div className="font-medium text-sm">{content.title}</div>
              {content.description && (
                <div className="text-xs text-gray-600 mt-1">{content.description}</div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
    <div className={`w-12 flex items-center justify-center ${color} bg-opacity-20`}>
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
);

const iconMap = {
  "Financial Planning": DollarSign,
  "Business Growth": TrendingUp,
  "Skill Development": Users,
  "Life Goals": Clock,
  "Future Vision": Lightbulb
};

const RoadmapSchedule = ({ timelineData = [] }) => {
  // Use default data if no timeline data is provided
  const defaultProcesses = [
    {
      name: "Financial Planning",
      color: "bg-cyan-600",
      years: Array(6).fill(null)
    },
    {
      name: "Business Growth",
      color: "bg-indigo-600",
      years: Array(6).fill(null)
    },
    {
      name: "Skill Development",
      color: "bg-blue-500",
      years: Array(6).fill(null)
    },
    {
      name: "Life Goals",
      color: "bg-emerald-600",
      years: Array(6).fill(null)
    },
    {
      name: "Future Vision",
      color: "bg-green-600",
      years: Array(6).fill(null)
    }
  ];

  const processes = timelineData.length > 0 ? timelineData : defaultProcesses;

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">Journey Timeline</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Years Header */}
            <div className="grid grid-cols-6 mb-4">
              {[2024, 2025, 2026, 2027, 2028, 2029].map(year => (
                <div key={year} className="text-center font-medium text-gray-600">
                  {year}
                </div>
              ))}
            </div>
            
            {/* Process Rows */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {processes.map((process, index) => (
                <ProcessRow
                  key={index}
                  process={process.name}
                  years={process.years}
                  icon={iconMap[process.name]}
                  color={process.color}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapSchedule;