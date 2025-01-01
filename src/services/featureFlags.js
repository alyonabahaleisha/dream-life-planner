// src/services/featureFlags.js
import { fetchAndActivate, getValue, fetchConfig } from 'firebase/remote-config';
import { remoteConfig } from '../config/firebase';

const FEATURE_FLAGS = [
  'enable_story_generation',
  'enable_image_generation',
  'enable_question_generation',
  'enable_roadmap_generation',
  'enable_milestone_generation',
  'enable_action_plan_generation',
  'enable_values_transition'
];

// Set all defaults to false to ensure Remote Config values take precedence
remoteConfig.defaultConfig = Object.fromEntries(
  FEATURE_FLAGS.map(flag => [flag, false])
);

// Set minimum fetch interval to 0 during development
remoteConfig.settings.minimumFetchIntervalMillis = 0;

export const initializeFeatureFlags = async () => {
  try {
    // Force a fetch from Remote Config
    await fetchConfig(remoteConfig);
    await fetchAndActivate(remoteConfig);
    
    console.group('Feature Flags Status');
    console.log('Remote config fetched and activated');
    
    const flagStatus = {};
    FEATURE_FLAGS.forEach(flag => {
      const value = getValue(remoteConfig, flag);
      flagStatus[flag] = value.asBoolean();
      console.log(`${flag}: ${value.asBoolean() ? '✅ Enabled' : '❌ Disabled'}`);
    });
    
    console.table(flagStatus); // Using console.table for better visibility
    console.groupEnd();
    
    return true;
  } catch (error) {
    console.error('Error fetching remote config:', error);
    return false;
  }
};

export const isFeatureEnabled = (featureName) => {
  try {
    const value = getValue(remoteConfig, featureName);
    const isEnabled = value.asBoolean();
    console.debug(`🚩 Feature flag check: ${featureName} = ${isEnabled ? '✅' : '❌'}`);
    return isEnabled;
  } catch (error) {
    console.error(`Error checking feature flag ${featureName}:`, error);
    return false; // Default to false on error for safety
  }
};