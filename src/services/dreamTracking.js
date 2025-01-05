// src/services/dreamTracking.js
import { auth } from '../config/firebase';

class DreamTrackingService {
  constructor() {
    this.API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    this.ANON_ID_KEY = 'anonymous_user_id';
  }

  getAnonymousId() {
    let anonymousId = localStorage.getItem(this.ANON_ID_KEY);
    if (!anonymousId) {
      anonymousId = `anon_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem(this.ANON_ID_KEY, anonymousId);
    }
    return anonymousId;
  }

  async getAuthHeaders() {
    const userId = auth.currentUser?.uid || this.getAnonymousId();
    const headers = {
      'Content-Type': 'application/json',
      'X-User-ID': userId
    };

    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async trackDreamSubmission(dreamText) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.API_URL}/dreams/track`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dreamText,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to track dream submission');
      }

      const result = await response.json();
      
      if (!result.success && result.requiresPaywall) {
        return {
          success: false,
          requiresPaywall: true,
          message: 'Free dream limit reached'
        };
      }

      return result;
    } catch (error) {
      console.error('Error tracking dream:', error);
      throw error;
    }
  }

  async canSubmitDream() {
    try {
      const headers = await this.getAuthHeaders();
      const userId = auth.currentUser?.uid || this.getAnonymousId();
      
      const response = await fetch(`${this.API_URL}/dreams/status/${userId}`, {
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to check dream submission status');
      }

      return response.json();
    } catch (error) {
      console.error('Error checking dream status:', error);
      return { canSubmit: false, error: error.message };
    }
  }

  async getDreamHistory() {
    try {
      const headers = await this.getAuthHeaders();
      const userId = auth.currentUser?.uid || this.getAnonymousId();
      
      const response = await fetch(`${this.API_URL}/dreams/history/${userId}`, {
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dream history');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching dream history:', error);
      return [];
    }
  }
}

export const dreamTrackingService = new DreamTrackingService();