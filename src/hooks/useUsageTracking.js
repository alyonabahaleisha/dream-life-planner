// src/hooks/useUsageTracking.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { usageTrackingService } from '../services/usageTracking';

export function useUsageTracking() {
  const { user } = useAuth();
  const [usageStatus, setUsageStatus] = useState({
    count: 0,
    limit: 20,
    remaining: 20,
    canUseMore: true,
    isPremium: false,
    isAnonymous: true,
    loading: true
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Check usage status on mount and when user changes
  useEffect(() => {
    checkUsage();
  }, [user]);

  const checkUsage = useCallback(async (forceRefresh = false) => {
    try {
      setUsageStatus(prev => ({ ...prev, loading: true }));
      const status = await usageTrackingService.checkUsageStatus(forceRefresh);
      setUsageStatus({ ...status, loading: false });
    } catch (error) {
      console.error('Error checking usage:', error);
      setUsageStatus(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const handleUsageError = useCallback((error) => {
    if (error.requiresAuth) {
      setShowAuthPrompt(true);
    } else if (error.requiresPaywall) {
      setShowPaywall(true);
    }
    // Refresh usage status
    checkUsage(true);
  }, [checkUsage]);

  const closePaywall = useCallback(() => {
    setShowPaywall(false);
  }, []);

  const closeAuthPrompt = useCallback(() => {
    setShowAuthPrompt(false);
  }, []);

  return {
    usageStatus,
    showPaywall,
    showAuthPrompt,
    checkUsage,
    handleUsageError,
    closePaywall,
    closeAuthPrompt
  };
}