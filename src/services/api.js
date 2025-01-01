// src/services/api.js
import { isFeatureEnabled } from './featureFlags';

const API_URL = import.meta.env.VITE_API_URL;

class FeatureDisabledError extends Error {
  constructor(featureName) {
    super(`The ${featureName} feature is currently disabled`);
    this.name = 'FeatureDisabledError';
  }
}

const handleError = async (response) => {
  const error = await response.json();
  throw new Error(error.message || 'API request failed');
};

const checkFeatureEnabled = (featureName) => {
  if (!isFeatureEnabled(featureName)) {
    throw new FeatureDisabledError(featureName);
  }
};

const getMockData = (feature) => {
  const mockResponses = {
    story: "This feature is temporarily unavailable. Please try again later.",
    image: { url: '/api/placeholder/400/320', type: 'mock' },
    questions: [
      {
        id: "mock_q1",
        section: "Basic Information",
        question: "This feature is currently unavailable. Please try the predefined questions.",
        options: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" }
        ]
      }
    ],
    roadmap: {
      content: "Roadmap generation is temporarily unavailable. Please try again later.",
      timeline: []
    },
    milestones: [
      {
        title: "Feature Unavailable",
        timeframe: "N/A",
        description: "Milestone generation is temporarily disabled.",
        progress: 0
      }
    ],
    actionPlan: [
      {
        day: 1,
        task: "Action plan generation is temporarily unavailable",
        estimatedTime: "N/A",
        priority: "Medium",
        resources: [],
        metrics: "N/A",
        category: "System",
        milestone: "N/A"
      }
    ],
    values: {
      currentValues: [
        {
          title: "Feature Unavailable",
          description: "Values analysis is temporarily disabled."
        }
      ],
      desiredValues: [],
      strategies: []
    }
  };

  return mockResponses[feature] || null;
};

export const generateStory = async (dreamLife, onChunk) => {
  try {
    checkFeatureEnabled('enable_story_generation');

    const response = await fetch(`${API_URL}/generate-story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife })
    });

    if (!response.ok) await handleError(response);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Error generating story:', error);
    if (error instanceof FeatureDisabledError) {
      onChunk(getMockData('story'));
    } else {
      throw error;
    }
  }
};

export const generateDalleImage = async (dreamLife) => {
  try {
    checkFeatureEnabled('enable_image_generation');

    const response = await fetch(`${API_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('image');
    }
    return null;
  }
};

export const generateQuestions = async (dreamLife) => {
  try {
    checkFeatureEnabled('enable_question_generation');

    const response = await fetch(`${API_URL}/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating questions:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('questions');
    }
    return null;
  }
};

export const generateRoadmap = async (dreamLife, answers) => {
  try {
    checkFeatureEnabled('enable_roadmap_generation');

    const response = await fetch(`${API_URL}/generate-roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife, answers })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating roadmap:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('roadmap');
    }
    return null;
  }
};

export const generateMilestones = async (dreamLife, answers) => {
  try {
    checkFeatureEnabled('enable_milestone_generation');

    const response = await fetch(`${API_URL}/generate-milestones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife, answers })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating milestones:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('milestones');
    }
    return [];
  }
};

export const generate30DayPlan = async (dreamLife, answers, milestones) => {
  try {
    checkFeatureEnabled('enable_action_plan_generation');

    const response = await fetch(`${API_URL}/generate-action-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife, answers, milestones })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating action plan:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('actionPlan');
    }
    return [];
  }
};

export const generateValuesTransition = async (dreamLife, answers) => {
  try {
    checkFeatureEnabled('enable_values_transition');

    const response = await fetch(`${API_URL}/generate-values-transition`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamLife, answers })
    });

    if (!response.ok) await handleError(response);
    return response.json();
  } catch (error) {
    console.error('Error generating values transition:', error);
    if (error instanceof FeatureDisabledError) {
      return getMockData('values');
    }
    return {
      currentValues: [],
      desiredValues: [],
      strategies: []
    };
  }
};