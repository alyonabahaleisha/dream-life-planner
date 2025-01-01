// src/contexts/FeatureFlagContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeFeatureFlags } from '../services/featureFlags';

const FeatureFlagContext = createContext({
  isInitialized: false,
  setInitialized: () => {}
});

export const FeatureFlagProvider = ({ children }) => {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeFeatureFlags();
      setInitialized(true);
    };

    initialize();
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ isInitialized, setInitialized }}>
      {isInitialized ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"/>
            <p className="text-gray-600">Loading application settings...</p>
          </div>
        </div>
      )}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext);