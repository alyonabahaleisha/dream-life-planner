// src/services/usageTracking.js
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class UsageTrackingService {
  constructor() {
    this.TEMP_USER_ID_KEY = 'temp_user_id';
    this.COOKIE_EXPIRY_DAYS = 30;
    this.usageCache = null;
    this.cacheExpiry = null;
  }

  getCurrentUserId() {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    }
    
    let tempUserId = this.getTempUserIdFromCookie();
    if (!tempUserId) {
      tempUserId = this.generateAndStoreTempUserId();
    }
    return tempUserId;
  }

  generateAndStoreTempUserId() {
    const tempUserId = `temp_${crypto.randomUUID()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.COOKIE_EXPIRY_DAYS);
    
    document.cookie = `${this.TEMP_USER_ID_KEY}=${tempUserId};expires=${expiryDate.toUTCString()};path=/`;
    return tempUserId;
  }

  getTempUserIdFromCookie() {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find(cookie => cookie.trim().startsWith(this.TEMP_USER_ID_KEY));
    return userIdCookie ? userIdCookie.split('=')[1] : null;
  }

  async getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      headers['X-User-ID'] = this.getCurrentUserId();
    }

    return headers;
  }

  async checkUsageStatus(forceRefresh = false) {
    // Return cached value if available and not forced to refresh
    if (!forceRefresh && this.usageCache && this.cacheExpiry && this.cacheExpiry > Date.now()) {
      return this.usageCache;
    }

    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/usage/status`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to check usage status');
      }

      const data = await response.json();
      
      // Cache the result for 1 minute
      this.usageCache = data;
      this.cacheExpiry = Date.now() + 60000;
      
      return data;
    } catch (error) {
      console.error('Error checking usage status:', error);
      // Return default values if error
      return {
        count: 0,
        limit: auth.currentUser ? 20 : 2,
        remaining: auth.currentUser ? 20 : 2,
        canUseMore: true,
        isPremium: false,
        isAnonymous: !auth.currentUser
      };
    }
  }

  clearCache() {
    this.usageCache = null;
    this.cacheExpiry = null;
  }

  async makeAPICall(endpoint, data, onError) {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/openai/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });

      // Check for usage limit error
      if (response.status === 403) {
        const error = await response.json();
        if (error.requiresPaywall || error.requiresAuth) {
          // Clear cache to get fresh usage data
          this.clearCache();
          if (onError) {
            onError(error);
          }
          throw new Error(error.message || 'Usage limit reached');
        }
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
      }

      // Update usage count from response headers
      const usageCount = response.headers.get('X-Usage-Count');
      const usageLimit = response.headers.get('X-Usage-Limit');
      const usageRemaining = response.headers.get('X-Usage-Remaining');

      if (usageCount && usageLimit && usageRemaining) {
        this.usageCache = {
          count: parseInt(usageCount),
          limit: parseInt(usageLimit),
          remaining: parseInt(usageRemaining),
          canUseMore: parseInt(usageRemaining) > 0,
          isPremium: parseInt(usageLimit) > 100,
          isAnonymous: !auth.currentUser
        };
        this.cacheExpiry = Date.now() + 60000;
      }

      return response;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  }
}

export const usageTrackingService = new UsageTrackingService();