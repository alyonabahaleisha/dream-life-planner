// src/main.jsx
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import LifeAssessment from './components/Assessment/LifeAssessment';
import Roadmap from './components/Roadmap';
import { withAuthProtection } from './components/AuthProtection';
import { useDevSettings } from './hooks/useDevSettings';

// Initialize development settings
if (process.env.NODE_ENV === 'development') {
  const { useMockApi } = useDevSettings.getState();
  console.log('Development mode active. Mock API:', useMockApi ? 'enabled' : 'disabled');
}

// Create protected versions of components
const ProtectedLifeAssessment = withAuthProtection(LifeAssessment);
const ProtectedRoadmap = withAuthProtection(Roadmap);

// Get the base URL from Vite's environment variables
const baseUrl = import.meta.env.BASE_URL || '/dream-life-planner/';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "assessment",
        element: <ProtectedLifeAssessment />
      },
      {
        path: "roadmap",
        element: <ProtectedRoadmap />
      }
    ]
  }
], {
  basename: baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
});

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);