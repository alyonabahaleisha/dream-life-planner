// src/components/PaywallDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, Laptop, Star } from 'lucide-react';

const PaywallDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'Unlimited Dreams',
      description: 'Create and explore as many dream life scenarios as you want'
    },
    {
      icon: Clock,
      title: 'Detailed Timeline',
      description: 'Get comprehensive roadmaps for achieving your goals'
    },
    {
      icon: Laptop,
      title: 'AI-Powered Planning',
      description: 'Advanced AI assistance for your journey'
    },
    {
      icon: Star,
      title: 'Premium Features',
      description: 'Access to exclusive tools and insights'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Unlock Your Full Potential</DialogTitle>
          <DialogDescription className="text-base">
            You've used your free dream generation. Upgrade to Premium to create unlimited dreams and access exclusive features.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <feature.icon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-slate-900">{feature.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="text-center space-y-1 mb-4">
            <div className="text-2xl font-semibold text-slate-900">$9.99/month</div>
            <div className="text-sm text-slate-600">Cancel anytime</div>
          </div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={() => {
              onClose();
              navigate('/pricing');
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Maybe Later
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t text-center text-sm text-slate-600">
          Premium includes all features, unlimited dreams, and priority support
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallDialog;