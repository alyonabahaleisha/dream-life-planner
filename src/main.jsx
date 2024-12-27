// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LifeAssessment from './components/Assessment/LifeAssessment'
import Roadmap from './components/Roadmap'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/assessment",
    element: <LifeAssessment />
  },
  {
    path: "/roadmap",
    element: <Roadmap />
  }
], {
  basename: "/dream-life-planner"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)