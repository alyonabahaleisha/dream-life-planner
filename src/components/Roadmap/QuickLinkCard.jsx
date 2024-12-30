// components/Roadmap/QuickLinkCard.jsx
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ArrowUpRight } from 'lucide-react';

export const QuickLinkCard = ({ icon: Icon, title, description, onClick }) => (
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