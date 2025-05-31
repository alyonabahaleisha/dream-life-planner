# Dream Life Planner - Frontend

A React-based web application that helps users visualize and plan their dream life using AI-powered tools.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on port 3000

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd ~/Dream/dream-life-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. **First, ensure the backend is running** (in a separate terminal):
   ```bash
   cd ~/Dream/dream-life-planner-api
   npm run dev
   ```
   The backend should be running on http://localhost:3000

2. **Check if backend is running**:
   ```bash
   # Option 1: Check port
   lsof -i :3000
   
   # Option 2: Test with curl
   curl http://localhost:3000
   
   # Option 3: Check node processes
   ps aux | grep node
   ```
   
   When backend is running correctly, you'll see:
   - "Server running on port 3000" in the terminal
   - Process listening on port 3000

3. **Then start the frontend** (in a new terminal):
   ```bash
   cd ~/Dream/dream-life-planner
   npm run dev
   ```
   The frontend will be available at http://localhost:5173/dream-life-planner/

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Features

- Dream life description input
- AI-generated stories and visualizations
- Life assessment questionnaires
- Detailed roadmaps with milestones
- 30-day action plans
- Authentication with Firebase
- Premium features with Stripe integration

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Firebase Authentication
- Radix UI Components
- React Router
- Zustand for state management
