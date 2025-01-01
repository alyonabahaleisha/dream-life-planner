// src/services/mockOpenAI.js

export const mockOpenAIService = {
    async generateStoryResponse(dreamLife) {
      return `[STORY]
  A day in the life of a ${dreamLife} begins with purpose and excitement. The morning starts with a refreshing workout session followed by a nutritious breakfast while reviewing the day's priorities.
  
  Throughout the day, there's a perfect balance between professional achievements and personal growth. Every interaction is meaningful, and every decision moves closer to the ultimate goals.
  
  The evening brings time for relaxation and reflection, surrounded by loved ones and the comfort of a well-designed living space.
  
  [SCHEDULE]
  [MORNING]
  6:00 AM: Wake up: Start with meditation and gratitude practice
  7:00 AM: Exercise: High-energy workout session
  8:00 AM: Breakfast: Healthy meal with family
  9:00 AM: Work: Focus on primary business objectives
  
  [DAY]
  11:00 AM: Meetings: Strategic planning with team
  1:00 PM: Lunch: Network with industry peers
  3:00 PM: Development: Personal growth activities
  4:00 PM: Innovation: Work on new projects
  
  [EVENING]
  5:00 PM: Family Time: Quality moments with loved ones
  7:00 PM: Dinner: Enjoy a gourmet meal at home
  8:30 PM: Relaxation: Reading and planning for tomorrow
  10:00 PM: Rest: Prepare for refreshing sleep`;
    },
  
    async generateImage() {
      return {
        url: '/api/placeholder/400/320',
        type: 'mock'
      };
    },
  
    async generateQuestions(dreamLife) {
      return [
        {
          id: 'mock_q1',
          section: 'Career Goals',
          question: 'What is your ideal work environment?',
          options: [
            { label: 'Remote work with flexible hours', value: 'remote_flexible' },
            { label: 'Traditional office environment', value: 'office' },
            { label: 'Hybrid setup', value: 'hybrid' },
            { label: 'Own business/entrepreneurship', value: 'entrepreneur' }
          ]
        },
        {
          id: 'mock_q2',
          section: 'Financial Goals',
          question: 'What is your primary financial objective?',
          options: [
            { label: 'Building wealth through investments', value: 'invest' },
            { label: 'Creating passive income', value: 'passive' },
            { label: 'Business ownership', value: 'business' },
            { label: 'Financial security', value: 'security' }
          ]
        }
      ];
    },
  
    async generateRoadmapResponse(dreamLife) {
      return {
        content: `Phase One: Foundation Building (Months 1-3)
        Objective: Establish core habits and systems
        Actions:
        • Create morning routine
        • Set up financial tracking
        • Begin skill development
  
        Phase Two: Growth Phase (Months 4-6)
        Objective: Expand capabilities and network
        Actions:
        • Launch first project
        • Build professional network
        • Develop secondary income stream`,
        timeline: [
          {
            title: 'Financial Independence',
            phase: 'planning',
            startMonth: 0,
            endMonth: 3,
            milestones: ['Savings plan', 'Investment strategy']
          },
          {
            title: 'Career Development',
            phase: 'execution',
            startMonth: 3,
            endMonth: 6,
            milestones: ['Skill acquisition', 'Network building']
          }
        ]
      };
    },
  
    async generateMilestones() {
      return [
        {
          title: 'Financial Foundation',
          timeframe: '3 months',
          description: 'Establish emergency fund and investment strategy',
          progress: 0
        },
        {
          title: 'Career Growth',
          timeframe: '6 months',
          description: 'Develop key professional skills and expand network',
          progress: 0
        }
      ];
    },
  
    async generateActionPlan() {
      return Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        task: `Day ${i + 1} focused task for achieving primary goal`,
        estimatedTime: '2 hours',
        priority: i < 10 ? 'High' : i < 20 ? 'Medium' : 'Low',
        resources: ['Resource 1', 'Resource 2'],
        metrics: 'Completion and quality assessment',
        category: 'Development',
        milestone: 'Phase One Completion'
      }));
    },
  
    async generateValuesTransition() {
      return {
        currentValues: [
          {
            title: 'Work-Life Balance',
            description: 'Maintaining equilibrium between professional and personal life'
          },
          {
            title: 'Financial Security',
            description: 'Building stable financial foundation'
          }
        ],
        desiredValues: [
          {
            title: 'Freedom and Flexibility',
            description: 'Having control over time and decisions'
          },
          {
            title: 'Impact and Growth',
            description: 'Making meaningful contributions while continuously developing'
          }
        ],
        strategies: [
          {
            from: 'Current routine',
            to: 'Flexible schedule',
            strategies: [
              'Gradually transition to remote work',
              'Implement time-blocking technique',
              'Develop passive income streams'
            ]
          }
        ]
      };
    }
  };