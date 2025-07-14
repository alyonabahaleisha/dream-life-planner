import React from 'react';

const DashboardNavigation = ({ sections, activeSection, onNavigate }) => {
  return (
    <div className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center py-4 space-x-2 md:space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-white shadow-sm scale-105'
                  : 'hover:bg-white/50'
              }`}
            >
              <span className="text-2xl mb-1">{section.icon}</span>
              <span className={`text-xs md:text-sm font-medium ${
                activeSection === section.id ? 'text-purple-600' : 'text-gray-600'
              }`}>
                {section.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;