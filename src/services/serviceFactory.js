// src/services/serviceFactory.js

import { mockOpenAIService } from './mockOpenAI';
import { isFeatureEnabled } from './featureFlags';

const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

class OpenAIService {
  constructor(useMocks = false) {
    this.useMocks = useMocks;
  }

  async makeAPICall(endpoint, body) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response;
  }

  async generateStory(dreamLife, onChunk) {
    if (this.useMocks || !isFeatureEnabled('enable_story_generation')) {
      const mockResponse = await mockOpenAIService.generateStoryResponse(dreamLife);
      onChunk(mockResponse);
      return;
    }

    const response = await this.makeAPICall('generate-story', { dreamLife });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value));
    }
  }

  async generateDalleImage(dreamLife) {
    if (this.useMocks || !isFeatureEnabled('enable_image_generation')) {
      return mockOpenAIService.generateImage(dreamLife);
    }

    const response = await this.makeAPICall('generate-image', { dreamLife });
    return response.json();
  }

  async generateQuestions(dreamLife) {
    if (this.useMocks || !isFeatureEnabled('enable_question_generation')) {
      return mockOpenAIService.generateQuestions(dreamLife);
    }

    const response = await this.makeAPICall('generate-questions', { dreamLife });
    return response.json();
  }

  async generateRoadmap(dreamLife, answers) {
    if (this.useMocks || !isFeatureEnabled('enable_roadmap_generation')) {
      return mockOpenAIService.generateRoadmapResponse(dreamLife);
    }

    const response = await this.makeAPICall('generate-roadmap', { dreamLife, answers });
    return response.json();
  }

  async generateMilestones(dreamLife, answers) {
    if (this.useMocks || !isFeatureEnabled('enable_milestone_generation')) {
      return mockOpenAIService.generateMilestones();
    }

    const response = await this.makeAPICall('generate-milestones', { dreamLife, answers });
    return response.json();
  }

  async generate30DayPlan(dreamLife, answers, milestones) {
    if (this.useMocks || !isFeatureEnabled('enable_action_plan_generation')) {
      return mockOpenAIService.generateActionPlan();
    }

    const response = await this.makeAPICall('generate-action-plan', { 
      dreamLife, 
      answers, 
      milestones 
    });
    return response.json();
  }

  async generateValuesTransition(dreamLife, answers) {
    if (this.useMocks || !isFeatureEnabled('enable_values_transition')) {
      return mockOpenAIService.generateValuesTransition();
    }

    const response = await this.makeAPICall('generate-values-transition', { 
      dreamLife, 
      answers 
    });
    return response.json();
  }
}

export const openAIService = new OpenAIService(USE_MOCKS);