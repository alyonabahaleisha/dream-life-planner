// src/services/api.js
import { mockOpenAIService } from './mockOpenAI';
import { getDevSettings } from '../hooks/useDevSettings';
import { usageTrackingService } from './usageTracking';

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

async function makeAPICall(endpoint, data, onUsageError) {
  try {
    if (shouldUseMocks()) {
      console.log(`Using mock data for ${endpoint}`);
      return getMockResponse(endpoint, data);
    }

    if (!API_URL) {
      throw new Error('API URL is not configured. Please check your environment variables.');
    }
   
    // Use the usage tracking service for API calls
    const response = await usageTrackingService.makeAPICall(endpoint, data, onUsageError);
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

export async function generateStory(dreamLife, onChunk, onUsageError) {
  try {
    const response = await makeAPICall('generate-story', { dreamLife }, onUsageError);
    
    // Clone the response to check headers safely
    const clonedResponse = response.clone();
    
    // Try to parse as JSON first
    try {
      const jsonData = await clonedResponse.json();
      // If it's JSON and has dialogue, it's the new format
      if (jsonData && jsonData.dialogue) {
        onChunk(JSON.stringify(jsonData));
        return;
      }
      // Otherwise fall through to text handling
    } catch (jsonError) {
      // Not JSON, continue with streaming
    }
    
    // Handle streaming text response (legacy format)
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

export async function generateDalleImage(dreamLife, onUsageError) {
  try {
    const response = await makeAPICall('generate-image', { dreamLife }, onUsageError);
    return response.json();
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function generateQuestions(dreamLife, onUsageError) {
  try {
    const response = await makeAPICall('generate-questions', { dreamLife }, onUsageError);
    return response.json();
  } catch (error) {
    console.error('Error generating questions:', error);
    return null;
  }
}

export async function generateRoadmap(dreamLife, answers, onUsageError) {
  try {
    const response = await makeAPICall('generate-roadmap', { dreamLife, answers }, onUsageError);
    return response.json();
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return null;
  }
}

export async function generateMilestones(dreamLife, answers, onUsageError) {
  try {
    const response = await makeAPICall('generate-milestones', { dreamLife, answers }, onUsageError);
    return response.json();
  } catch (error) {
    console.error('Error generating milestones:', error);
    return [];
  }
}

export async function generate30DayPlan(dreamLife, answers, milestones, onUsageError) {
  try {
    const response = await makeAPICall('generate-action-plan', {
      dreamLife,
      answers,
      milestones
    }, onUsageError);
    return response.json();
  } catch (error) {
    console.error('Error generating action plan:', error);
    return [];
  }
}

export async function generateValuesTransition(dreamLife, answers, onUsageError) {
  try {
    const response = await makeAPICall('generate-values-transition', {
      dreamLife,
      answers
    }, onUsageError);
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

export async function generateBlueprint(dreamDescription, assessmentData, onUsageError) {
  try {
    const response = await makeAPICall('generate-blueprint', {
      dreamDescription,
      assessmentData
    }, onUsageError);
    const data = await response.json();
    return data.blueprint || data;
  } catch (error) {
    console.error('Error generating blueprint:', error);
    throw error;
  }
}