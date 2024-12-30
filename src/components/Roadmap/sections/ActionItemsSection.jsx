// components/Roadmap/sections/ActionItemsSection.jsx
import React from 'react';
import { ActionItem } from '../ActionItem';

export const ActionItemsSection = ({ items, completedItems, onToggleItem }) => (
    <div className="space-y-4">
      {items.map((item) => (
        <ActionItem
          key={item.id}
          {...item}
          isCompleted={completedItems[item.id] || false}
          onToggle={() => onToggleItem(item.id)}
        />
      ))}
    </div>
  );