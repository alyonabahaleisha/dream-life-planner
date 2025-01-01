// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './components/Layout'
import LifeAssessment from './components/Assessment/LifeAssessment'
import Roadmap from './components/Roadmap'
import { FeatureFlagProvider } from './contexts/FeatureFlagContext'

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
        path: "assessment",
        element: <LifeAssessment />
      },
      {
        path: "roadmap",
        element: <Roadmap />
      }
    ]
  }
], {
  basename: "/dream-life-planner"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeatureFlagProvider>
      <RouterProvider router={router} />
    </FeatureFlagProvider>
  </StrictMode>
);