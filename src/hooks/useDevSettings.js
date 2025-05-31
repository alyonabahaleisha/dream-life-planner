// src/hooks/useDevSettings.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDevSettings = create(
  persist(
    (set) => ({
      useMockApi: false, // Default to false - use real API
      setUseMockApi: (value) => {
        console.log('Setting mock API:', value);
        set({ useMockApi: value });
      },
    }),
    {
      name: 'dev-settings',
    }
  )
);

export const getDevSettings = () => {
  const state = useDevSettings.getState();
  console.log('Current dev settings:', state);
  return state;
};

export default useDevSettings;