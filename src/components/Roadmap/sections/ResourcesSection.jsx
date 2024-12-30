// components/Roadmap/sections/ResourcesSection.jsx
import React from 'react';
import { QuickLinkCard } from '../QuickLinkCard';

// components/Roadmap/sections/ResourcesSection.jsx
export const ResourcesSection = ({ quickLinks, onSectionChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quickLinks.map((link, index) => (
        <QuickLinkCard
          key={index}
          {...link}
          onClick={() => onSectionChange(link.section)}
        />
      ))}
    </div>
  );