// src/services/userTracking.js
import { auth } from '../config/firebase';

class UserTrackingService {
  constructor() {
    this.ANON_ID_KEY = 'anonymous_user_id';
  }

  generateAnonymousId() {
    return `anon_${Math.random().toString(36).substring(2, 15)}`;
  }

  getAnonymousId() {
    let anonymousId = localStorage.getItem(this.ANON_ID_KEY);
    if (!anonymousId) {
      anonymousId = this.generateAnonymousId();
      localStorage.setItem(this.ANON_ID_KEY, anonymousId);
    }
    return anonymousId;
  }

  getCurrentUserId() {
    return auth.currentUser?.uid || this.getAnonymousId();
  }

  // Call this when user logs in to migrate their anonymous data
  async migrateAnonymousData() {
    const anonymousId = localStorage.getItem(this.ANON_ID_KEY);
    if (anonymousId && auth.currentUser) {
      // Implement data migration logic here when needed
      localStorage.removeItem(this.ANON_ID_KEY);
    }
  }
}

export const userTrackingService = new UserTrackingService();