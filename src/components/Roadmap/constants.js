// components/Roadmap/constants.js
import { BarChart, TrendingUp, Brain, Heart } from 'lucide-react';

export const QUICK_LINKS = [
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

export const ACTION_ITEMS = [
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