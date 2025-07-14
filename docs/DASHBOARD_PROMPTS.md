# Dream Blueprint Dashboard - Claude Prompts

## Overview
This document contains the detailed prompts for generating each section of the Dream Blueprint Dashboard. These prompts are designed to create specific, actionable, and inspiring content for any dream.

## Master Blueprint Generation Prompt

```javascript
const BLUEPRINT_GENERATION_PROMPT = `
You are an expert life coach and strategic planner. Your task is to create a comprehensive, actionable blueprint that transforms someone's dream into reality.

IMPORTANT GUIDELINES:
- Be specific and concrete, not vague or generic
- Use realistic timeframes based on typical achievement patterns
- Balance ambition with achievability
- Focus on action, not just inspiration
- Adapt complexity based on the dream's scope

Dream Description: "{dreamDescription}"

Assessment Data:
{assessmentData}

Create a detailed blueprint with ALL of the following sections:

1. MILESTONES - Major achievements marking progress toward the dream
2. SPRINT_PLAN - 90-day week-by-week action plan
3. DAILY_ROUTINES - Specific daily habits to build
4. MINDSET_SHIFTS - Mental transformations required
5. IDENTITY_EVOLUTION - Progressive identity changes

Respond in JSON format exactly as specified below.
`;
```

## Section 1: Milestone Generation

```javascript
const MILESTONE_PROMPT = `
Generate 5-7 major milestones for achieving: "{dreamDescription}"

Current situation: {currentSituation}

MILESTONE REQUIREMENTS:
- Start from their current state
- Build progressively toward the dream
- Include skill acquisition milestones
- Include tangible achievement milestones
- Include validation/feedback milestones
- Use realistic timeframes

For each milestone provide:
{
  "id": "m1",
  "title": "Clear, specific achievement (e.g., 'First Paying Customer' not 'Start Business')",
  "timeframe": "Realistic estimate (e.g., '3-6 months')",
  "description": "What this milestone represents and why it matters",
  "criteria": [
    "Specific measurable indicator 1",
    "Specific measurable indicator 2"
  ],
  "prerequisites": ["What must be completed before this"],
  "resources": ["Key resources or skills needed"],
  "commonChallenges": ["Typical obstacles at this stage"],
  "celebrationSuggestion": "How to acknowledge this achievement"
}

EXAMPLES BY DREAM TYPE:

For "$100k/month online business":
- M1: First $1 sale online (Week 2-4)
- M2: Consistent $1k/month (Month 2-3)
- M3: First $10k month (Month 4-6)
- M4: Consistent $25k/month (Month 8-12)
- M5: Scale to $50k/month (Year 1-1.5)
- M6: Achieve $100k/month (Year 1.5-2)

For "Become a published author":
- M1: Complete first chapter (Week 2-3)
- M2: Finish first draft (Month 3-6)
- M3: Complete professional edit (Month 7-8)
- M4: Secure agent/publisher (Month 9-12)
- M5: Book launch (Month 15-18)

Adapt the progression speed and complexity based on:
- Dream complexity
- Starting resources
- Time availability
- Prior experience
`;
```

## Section 2: 90-Day Sprint Plan

```javascript
const SPRINT_PLAN_PROMPT = `
Create a detailed 90-day sprint plan for: "{dreamDescription}"

Starting point: {currentSituation}
First milestone target: {firstMilestone}

STRUCTURE YOUR PLAN AS:

PHASE 1 - FOUNDATION (Days 1-30)
Purpose: Build knowledge, habits, and momentum

Week 1: Discovery & Planning
- Day 1-2: [Specific research tasks]
- Day 3-4: [Planning and goal setting]
- Day 5-7: [First small actions]
- Time: 1-2 hours/day
- Deliverable: Clear action plan

Week 2: Skill Building
- Monday: [Specific skill focus]
- Tuesday-Thursday: [Practice activities]
- Friday: [Application exercise]
- Weekend: [Review and plan ahead]
- Time: 2-3 hours/day
- Deliverable: Basic competency

Week 3: First Creation
- [Daily specific tasks]
- Time commitment
- Expected output

Week 4: Feedback & Iteration
- [Testing and refinement tasks]
- Milestone check

PHASE 2 - BUILD (Days 31-60)
Purpose: Create real value and test assumptions

Week 5-6: Minimum Viable Progress
- [Specific building tasks]
- [Daily time blocks]
- [Weekly goals]

Week 7-8: Expand and Improve
- [Scaling activities]
- [Quality improvements]
- [Relationship building]

PHASE 3 - LAUNCH (Days 61-90)
Purpose: Get real results and build momentum

Week 9-10: Go Live
- [Launch preparation]
- [Execution tasks]
- [Daily priorities]

Week 11-12: Optimize & Scale
- [Improvement based on feedback]
- [Scaling what works]
- [Planning beyond 90 days]

For each week include:
{
  "week": 1,
  "theme": "Week's main focus",
  "days": {
    "monday": {
      "focus": "Main task for the day",
      "actions": ["Specific task 1", "Specific task 2"],
      "time": "2 hours",
      "output": "What will be completed"
    },
    // ... other days
  },
  "weeklyGoal": "What must be achieved by week's end",
  "successMetrics": ["How to measure progress"],
  "commonPitfalls": ["What to avoid this week"],
  "energyManagement": "How to maintain momentum"
}
`;
```

## Section 3: Daily Routines

```javascript
const ROUTINES_PROMPT = `
Design daily routines that support achieving: "{dreamDescription}"

Current schedule: {currentSchedule}
Available time: {availableTime}

CREATE 4-6 SPECIFIC ROUTINES:

1. MORNING LAUNCH ROUTINE (20-45 min)
Purpose: Start each day aligned with your dream

Example for business dream:
- 5 min: Review goals and visualize success
- 10 min: Industry news and trends
- 15 min: Plan day's key business task
- 10 min: Connect with one potential customer

2. DEEP WORK BLOCK (1-3 hours)
Purpose: Make tangible progress on dream

Structure:
- Specific time window
- Environment setup
- Focus techniques
- Progress tracking

3. SKILL DEVELOPMENT (30-60 min)
Purpose: Build capabilities needed

Options based on dream:
- Course/tutorial time
- Practice exercises
- Mentor meetings
- Experimentation

4. EVENING REVIEW (15-20 min)
Purpose: Reflect and improve

Components:
- Progress check
- Lessons learned
- Tomorrow's priority
- Gratitude practice

5. WEEKLY PLANNING (60-90 min)
Purpose: Stay strategic

Include:
- Week review
- Milestone check
- Next week priorities
- Adjustment decisions

For each routine provide:
{
  "name": "Routine name",
  "purpose": "Why this matters for their dream",
  "timeSlot": "Best time of day",
  "duration": "How long it takes",
  "components": [
    {
      "activity": "Specific activity",
      "duration": "X minutes",
      "instructions": "Exactly how to do it",
      "tools": ["Any tools/apps needed"]
    }
  ],
  "triggers": "Environmental cues to start",
  "rewards": "How to reinforce the habit",
  "adaptations": "How to modify when busy",
  "impact": "Expected results after 30 days"
}

CUSTOMIZATION FACTORS:
- Dream type (creative vs business vs skill)
- Available time (full-time job vs flexible)
- Energy patterns (morning vs night person)
- Current habits to build upon
`;
```

## Section 4: Mindset Shifts

```javascript
const MINDSET_SHIFTS_PROMPT = `
Identify 5-6 critical mindset shifts needed for: "{dreamDescription}"

Current beliefs indicated by: {assessmentData}

ANALYZE AND CREATE TRANSFORMATIONS:

For each limiting belief, provide:
{
  "id": "ms1",
  "from": "Current limiting belief (e.g., 'I need everything perfect before starting')",
  "to": "Empowering belief (e.g., 'Progress beats perfection')",
  "why": "Why this shift is critical for their specific dream",
  "evidence": [
    "Proof point 1 that new belief is true",
    "Success story example",
    "Logical reasoning"
  ],
  "bridgeThoughts": [
    "Stepping stone belief 1",
    "Stepping stone belief 2"
  ],
  "dailyPractice": {
    "morning": "Affirmation or reflection",
    "trigger": "When old belief appears, do this",
    "evening": "Reinforcement activity"
  },
  "resistanceHandler": "What to do when the old belief feels true"
}

COMMON PATTERNS BY DREAM TYPE:

For Financial Dreams:
- From: "Money is hard to make" → To: "Value creation attracts money"
- From: "I'm not good with money" → To: "I can learn any skill"

For Creative Dreams:
- From: "I'm not talented enough" → To: "Skill comes from practice"
- From: "It's too late to start" → To: "Now is the perfect time"

For Career Changes:
- From: "I can't afford to switch" → To: "I can transition strategically"
- From: "I don't have the right background" → To: "My unique path is my strength"

INCLUDE:
- Identity-level shifts ("I'm not a..." → "I am becoming...")
- Capability beliefs ("I can't..." → "I'm learning to...")
- Worthiness beliefs ("I don't deserve..." → "I'm worthy of...")
- Possibility beliefs ("It's impossible..." → "It's possible when...")
`;
```

## Section 5: Identity Evolution

```javascript
const IDENTITY_EVOLUTION_PROMPT = `
Map the identity transformation journey for: "{dreamDescription}"

Current identity indicators: {currentIdentity}
Dream identity: {dreamIdentity}

CREATE 5-7 PROGRESSIVE IDENTITY STAGES:

{
  "stages": [
    {
      "stage": 1,
      "title": "The Dreamer",
      "timeframe": "Current",
      "description": "You have a vision but haven't started",
      "characteristics": [
        "Thinks about the dream often",
        "Researches possibilities",
        "Feels mix of excitement and fear"
      ],
      "actions": ["Clarifying the vision", "Gathering courage"],
      "milestone": "Decision to begin"
    },
    {
      "stage": 2,
      "title": "The Beginner",
      "timeframe": "Days 1-30",
      "description": "You're taking first actions",
      "characteristics": [
        "Shows up despite fear",
        "Makes many mistakes",
        "Learns rapidly"
      ],
      "actions": ["Daily practice", "Seeking knowledge"],
      "milestone": "First small win"
    },
    {
      "stage": 3,
      "title": "The Builder",
      "timeframe": "Days 31-90",
      "description": "You're creating momentum",
      "characteristics": [
        "Develops consistent habits",
        "Sees early results",
        "Gains confidence"
      ],
      "actions": ["Creating systems", "Getting feedback"],
      "milestone": "First real validation"
    },
    // ... continue through to dream achievement
    {
      "stage": 7,
      "title": "[Dream-Specific Title]",
      "timeframe": "Full Achievement",
      "description": "You're living the dream",
      "characteristics": [
        "[Specific to their dream]",
        "[How they operate]",
        "[How others see them]"
      ],
      "actions": ["Maintaining excellence", "Helping others"],
      "milestone": "Dream fully realized"
    }
  ],
  "currentStage": 1,
  "nextStageTarget": "What moves you to stage 2",
  "identityStatement": "I am someone who [current evolving identity]"
}

STAGE NAMING EXAMPLES:

For Business Dreams:
Dreamer → Explorer → Founder → Builder → CEO → Industry Leader

For Creative Dreams:
Dreamer → Student → Practitioner → Creator → Artist → Master

For Skill-Based Dreams:
Dreamer → Learner → Practitioner → Competent → Expert → Master

IMPORTANT:
- Each stage should feel achievable from the previous
- Include specific behaviors that mark each stage
- Show internal and external changes
- Make the evolution inspiring but realistic
`;
```

## Integration Example

```javascript
// Backend service implementation
async generateDreamBlueprint(dreamDescription, assessmentData) {
  const fullPrompt = `
${BLUEPRINT_GENERATION_PROMPT}

${MILESTONE_PROMPT}

${SPRINT_PLAN_PROMPT}

${ROUTINES_PROMPT}

${MINDSET_SHIFTS_PROMPT}

${IDENTITY_EVOLUTION_PROMPT}

Now generate the complete blueprint in this exact JSON structure:
{
  "milestones": [...],
  "sprintPlan": {
    "phase1": {...},
    "phase2": {...},
    "phase3": {...}
  },
  "dailyRoutines": [...],
  "mindsetShifts": [...],
  "identityEvolution": {...},
  "metadata": {
    "generatedAt": "timestamp",
    "dreamType": "category",
    "estimatedTimeline": "total time to achievement",
    "difficultyLevel": "easy|moderate|challenging|extreme"
  }
}
`;

  return await claude.generateStructuredOutput(fullPrompt, {
    dreamDescription,
    assessmentData
  });
}
```

## Prompt Optimization Tips

1. **Dream-Specific Adaptation**
   - Detect dream category (business, creative, lifestyle, skill)
   - Adjust timeframes based on complexity
   - Include industry-specific milestones

2. **Personalization Factors**
   - Current life stage (student, employed, parent)
   - Available time (full-time pursuit vs side project)
   - Resources (financial, social, educational)
   - Risk tolerance

3. **Realism Checks**
   - Validate timeframes against real examples
   - Include buffer time for setbacks
   - Account for learning curves
   - Consider external dependencies

4. **Motivation Maintenance**
   - Start with quick wins
   - Celebrate small victories
   - Show progress clearly
   - Connect to deeper purpose

## Testing the Prompts

Test with diverse dreams:
1. "I want to make $100k/month online"
2. "I want to become a dentist"
3. "I want to write a bestselling novel"
4. "I want to travel the world as a digital nomad"
5. "I want to master the piano"
6. "I want to get in the best shape of my life"
7. "I want to build a tech startup"
8. "I want to become a life coach"

Each should generate:
- Appropriate complexity
- Realistic timeframes
- Specific actions
- Relevant mindset shifts
- Clear identity evolution