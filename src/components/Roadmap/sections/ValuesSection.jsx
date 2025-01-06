// components/Roadmap/sections/ValuesSection.jsx
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { ArrowRight } from 'lucide-react';

const ValueCard = ({ title, description }) => (
  <Card className="bg-white transition-all hover:shadow-md">
    <CardContent className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </CardContent>
  </Card>
);

const TransitionStrategy = ({ from, to, strategies }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="flex-1 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700">{from}</h4>
      </div>
      <ArrowRight className="w-5 h-5 text-blue-500" />
      <div className="flex-1 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-700">{to}</h4>
      </div>
    </div>
    <ul className="space-y-2 pl-6">
      {strategies.map((strategy, index) => (
        <li key={index} className="text-gray-600">
          • {strategy}
        </li>
      ))}
    </ul>
  </div>
);

export const ValuesSection = ({ isLoading, currentValues, desiredValues, strategies }) => (
  <div className="space-y-8">
    {isLoading ? (
      <div className="space-y-6">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse h-32" />
        ))}
      </div>
    ) : (
      <>
        {/* Current Values */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900">Current Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentValues.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>

        {/* Desired Values */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900">Values to Develop</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {desiredValues.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>

        {/* Transition Strategies */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900">Value Transition Strategies</h3>
          <div className="space-y-6">
            {strategies.map((strategy, index) => (
              <TransitionStrategy key={index} {...strategy} />
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);