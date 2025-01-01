// src/services/api.js
import { mockOpenAIService } from './mockOpenAI';
import { getDevSettings } from '../hooks/useDevSettings';

const API_URL = import.meta.env.VITE_API_URL;

function shouldUseMocks() {
  if (process.env.NODE_ENV === 'development') {
    const mockEnabled = getDevSettings().useMockApi;
    console.log('Mock API status:', mockEnabled);
    return mockEnabled;
  }
  return false;
}

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

async function makeAPICall(endpoint, data) {
  try {
   console.log('make api call')
    if (shouldUseMocks()) {
      console.log(`Using mock data for ${endpoint}`);
      return getMockResponse(endpoint, data);
    }

    if (!API_URL) {
      throw new Error('API URL is not configured. Please check your environment variables.');
    }
   
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message || 'API request failed', response.status);
    }

    return response;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    if (shouldUseMocks()) {
      console.log(`Falling back to mock data for ${endpoint}`);
      return getMockResponse(endpoint, data);
    }
    throw error;
  }
}

async function getMockResponse(endpoint, data) {
  switch (endpoint) {
    case 'generate-story': {
      const mockStoryResponse = await mockOpenAIService.generateStoryResponse(data.dreamLife);
      console.log('Generated mock story:', mockStoryResponse);
      return {
        body: {
          getReader: () => {
            let hasReturned = false;
            return {
              read: async () => {
                if (hasReturned) {
                  return { done: true, value: undefined };
                }
                hasReturned = true;
                return {
                  done: false,
                  value: new TextEncoder().encode(mockStoryResponse)
                };
              }
            };
          }
        }
      };
    }
    case 'generate-image':
      return {
        json: async () => mockOpenAIService.generateImage()
      };
    case 'generate-questions':
      return {
        json: async () => mockOpenAIService.generateQuestions(data.dreamLife)
      };
    case 'generate-roadmap':
      return {
        json: async () => mockOpenAIService.generateRoadmapResponse(data.dreamLife)
      };
    case 'generate-milestones':
      return {
        json: async () => mockOpenAIService.generateMilestones()
      };
    case 'generate-action-plan':
      return {
        json: async () => mockOpenAIService.generateActionPlan()
      };
    case 'generate-values-transition':
      return {
        json: async () => mockOpenAIService.generateValuesTransition()
      };
    default:
      throw new Error(`No mock implementation for endpoint: ${endpoint}`);
  }
}

export async function generateStory(dreamLife, onChunk) {
  try {
    const response = await makeAPICall('generate-story', { dreamLife });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result;
    do {
      result = await reader.read();
      if (result.value) {
        const chunk = decoder.decode(result.value);
        onChunk(chunk);
      }
    } while (!result.done);
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
}

export async function generateDalleImage(dreamLife) {
  try {
    const response = await makeAPICall('generate-image', { dreamLife });
    return response.json();
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function generateQuestions(dreamLife) {
  try {
    const response = await makeAPICall('generate-questions', { dreamLife });
    return response.json();
  } catch (error) {
    console.error('Error generating questions:', error);
    return null;
  }
}

export async function generateRoadmap(dreamLife, answers) {
  try {
    const response = await makeAPICall('generate-roadmap', { dreamLife, answers });
    return response.json();
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return null;
  }
}

export async function generateMilestones(dreamLife, answers) {
  try {
    const response = await makeAPICall('generate-milestones', { dreamLife, answers });
    return response.json();
  } catch (error) {
    console.error('Error generating milestones:', error);
    return [];
  }
}

export async function generate30DayPlan(dreamLife, answers, milestones) {
  try {
    const response = await makeAPICall('generate-action-plan', {
      dreamLife,
      answers,
      milestones
    });
    return response.json();
  } catch (error) {
    console.error('Error generating action plan:', error);
    return [];
  }
}

export async function generateValuesTransition(dreamLife, answers) {
  try {
    const response = await makeAPICall('generate-values-transition', {
      dreamLife,
      answers
    });
    return response.json();
  } catch (error) {
    console.error('Error generating values transition:', error);
    return {
      currentValues: [],
      desiredValues: [],
      strategies: []
    };
  }
}