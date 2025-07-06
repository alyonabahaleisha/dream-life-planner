// src/services/mockOpenAI.js

export const mockOpenAIService = {
    async generateStoryResponse(dreamLife) {
      // Generate personalized story based on dream keywords
      const dreamLower = dreamLife.toLowerCase();
      
      // Check for specific dream elements
      if (dreamLower.includes('travel') || dreamLower.includes('nomad')) {
        return generateTravelDreamStory(dreamLife);
      } else if (dreamLower.includes('family') || dreamLower.includes('kids')) {
        return generateFamilyDreamStory(dreamLife);
      } else if (dreamLower.includes('business') || dreamLower.includes('entrepreneur')) {
        return generateBusinessDreamStory(dreamLife);
      } else if (dreamLower.includes('creative') || dreamLower.includes('art') || dreamLower.includes('write')) {
        return generateCreativeDreamStory(dreamLife);
      }
      
      // Default story with AHA moments
      return `[AHA_MOMENTS]
1. You haven't set an alarm in 6 months because your body naturally wakes up energized at 6 AM
2. Your morning coffee meeting just turned into a $50K partnership deal without even trying
3. That Fortune 500 company's $200K offer was declined because it didn't align with your mission
4. Your LinkedIn post got 50K views but you were too busy mentoring to notice for three days
5. You haven't checked job boards in 2 years because you created the perfect life

[STORY]
It feels so good. Everything I dreamed about came true.

No more overthinking. No more struggles. Just peace.

6 AM. Eyes open naturally. No alarm. "Thank you, universe," I whisper. My body knows when to wake now.

Coffee on the balcony. Check my phone. Three partnership offers overnight. I can choose. Remember when I'd take any gig? Gone.

"We can afford it." I actually said that yesterday. Out loud. About the vacation. No calculator needed.

Lunch meeting. They offered $50K. I wasn't even trying to sell. Just shared my story. "Thank you," I said. Meant it.

My mind is quiet. Really quiet. That constant worry soundtrack? Switched off.

3 PM. Declined a Fortune 500 contract. Six figures. Didn't align with my values. Felt amazing. The struggle is over.

Kid interrupts my call. "Work can wait," I say. And mean it. We build Legos instead.

Evening walk. I realize something. Haven't checked job boards in two years. Not because I found the perfect job. Because I created the perfect life.

"Thank you. Thank you. Thank you." Under the stars. This is it.

There is so much to love and experience on this earth. And now, I finally can.
  
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
        url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=800&h=400&fit=crop',
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
          id: 1,
          title: 'Launch Your Platform',
          description: 'Create and launch your personal brand or business platform',
          targetDate: '3 months',
          impact: 'Establish your online presence and credibility',
          tasks: [
            'Define your unique value proposition',
            'Build your website or platform',
            'Create initial content or offerings'
          ]
        },
        {
          id: 2,
          title: 'First Revenue Stream',
          description: 'Generate your first $1000 from your new venture',
          targetDate: '6 months',
          impact: 'Validate your business model and build confidence',
          tasks: [
            'Identify target customers',
            'Create and test your offer',
            'Implement sales strategy'
          ]
        }
      ];
    },
  
    async generateActionPlan() {
      return {
        week1: {
          theme: 'Foundation Setting',
          tasks: [
            {
              id: 'w1_1',
              title: 'Define Your Vision',
              description: 'Create a clear vision board and written goals',
              timeRequired: '2 hours',
              priority: 'high'
            },
            {
              id: 'w1_2',
              title: 'Audit Current Situation',
              description: 'Assess finances, skills, and resources',
              timeRequired: '3 hours',
              priority: 'high'
            }
          ]
        },
        week2: {
          theme: 'Skill Development',
          tasks: [
            {
              id: 'w2_1',
              title: 'Identify Key Skills',
              description: 'List top 3 skills needed for your dream life',
              timeRequired: '1 hour',
              priority: 'high'
            },
            {
              id: 'w2_2',
              title: 'Start Learning',
              description: 'Enroll in course or find mentor',
              timeRequired: '2 hours',
              priority: 'medium'
            }
          ]
        }
      };
    },
  
    async generateValuesTransition() {
      return {
        currentValues: [
          { value: 'Security', description: 'Seeking stable income and predictable routine' },
          { value: 'Approval', description: 'Making decisions based on others\' expectations' },
          { value: 'Comfort', description: 'Staying in familiar situations' }
        ],
        desiredValues: [
          { value: 'Freedom', description: 'Making choices aligned with personal vision' },
          { value: 'Growth', description: 'Embracing challenges as opportunities' },
          { value: 'Impact', description: 'Creating meaningful change in the world' }
        ],
        strategies: [
          'Start small: Make one decision daily based on desired values',
          'Track progress: Journal about value-aligned actions',
          'Find community: Connect with others living your desired values'
        ]
      };
    }
  };

// Specialized story generators for different dream types
function generateTravelDreamStory(dreamLife) {
  return `[AHA_MOMENTS]
1. You're earning more from your laptop in cafes than you ever did in your corner office
2. That client meeting from a Bali treehouse proved your lifestyle is your business advantage
3. You declined a $250K Silicon Valley offer from your hammock - your business already exceeds that
4. Digital nomads you've never met tag you as their inspiration daily
5. You've visited 34 countries in 18 months, but 'vacation mode' became your permanent state

[STORY]
It feels so good. Everything I dreamed about came true.

No more choosing between rent and travel. No more "someday." Just freedom.

Morning in Lisbon. Ocean view. Laptop open. "Thank you," I say to the sunrise. My office changes daily now.

Client Zoom from a treehouse in Bali. They hired me because of my lifestyle. Not despite it. Remember when I hid my travel dreams in interviews? Gone.

$15K month. Working 20 hours. From beaches. Mountains. Cafes. My mind is quiet.

Text from Silicon Valley startup. $250K to relocate. I reply from my hammock. "No thanks." Feels incredible.

"We can afford it." Every flight. Every experience. No spreadsheet needed.

DM notification. Another nomad inspired by my journey. "Thank you, universe." I whisper. My story helps others escape too.

The struggle is over. Really over.

Evening swim. 34 countries in 18 months. Remember lying awake, saving for one vacation? That person feels like a stranger now.

"Thank you. Thank you. Thank you." The water is perfect. This is it.

There is so much to love and experience on this earth. And now, I finally can.

[SCHEDULE]
[MORNING]
7:00 AM: Wake naturally: Ocean waves as alarm clock
8:00 AM: Beachside yoga: Movement and meditation
9:00 AM: Breakfast: Local cafe, planning day's adventures
10:00 AM: Deep work: 2-hour focused business session

[DAY]
12:00 PM: Exploration: Discover hidden local spots
2:00 PM: Lunch: Authentic local cuisine experience  
3:00 PM: Client calls: Strategic consulting from paradise
5:00 PM: Content creation: Document journey authentically

[EVENING]
6:00 PM: Sunset ritual: Gratitude practice with view
7:30 PM: Dinner: Connect with fellow travelers
9:00 PM: Planning: Research next destination
10:30 PM: Rest: Sleep under foreign stars`;
}

function generateFamilyDreamStory(dreamLife) {
  return `[AHA_MOMENTS]
1. Your 8-year-old asked if you can chaperone - and you said yes without checking work calendar
2. That kitchen table business hit $500K revenue with your 10-year-old as investor
3. You turned down a board position because it met during soccer practice hours
4. Other parents ask how you 'do it all' - but you just do what matters
5. You haven't missed a single important moment in two years - success means being present

[STORY]
It feels so good. Everything I dreamed about came true.

No more choosing between paycheck and presence. No more guilt. Just love.

6:30 AM. Little hands wake me. "Can you chaperone the field trip?" "Yes." No calendar check needed. "Thank you, universe."

Kitchen table office. Kids playing nearby. Check revenue. $500K this year. From home. Remember when I cried in the parking lot after daycare drop-off? Gone.

My mind is quiet. Present. Here.

"Mommy, look!" I actually look. Really look. Work can wait. Always.

Board position offer. Prestigious. During soccer practice hours. "No thanks." They respect me more for it.

"We can afford it." The summer camp. The music lessons. The family vacation. No more choosing.

"Thank you," I whisper during school pickup. Other parents ask my secret. There isn't one. I just chose what matters.

The struggle is over. The juggle too.

Bedtime stories. I realize something beautiful. Two years. Zero missed moments. Every recital. Every game. Every random Tuesday hug.

"Thank you. Thank you. Thank you." They're sleeping now. This is it.

There is so much to love and experience on this earth. And now, I finally can.

[SCHEDULE]
[MORNING]
6:30 AM: Wake up: Quiet coffee before chaos
7:00 AM: Family breakfast: Everyone shares daily goals
8:00 AM: School run: Walking meditation with kids
9:00 AM: Business time: Focused work sprint

[DAY]
11:00 AM: Strategic planning: Growing the business
12:30 PM: Lunch: Sometimes alone, sometimes surprise school visit
2:00 PM: Client work: High-value activities only
3:30 PM: School pickup: Transition to family time

[EVENING]
4:00 PM: Homework help: Being present and patient
5:30 PM: Family activities: Sports, art, or just playing
7:00 PM: Dinner together: No phones, full attention
8:30 PM: Bedtime routines: Stories and connection
9:30 PM: Adult time: Relationship and personal growth`;
}

function generateBusinessDreamStory(dreamLife) {
  return `[AHA_MOMENTS]
1. Your business hit $2M revenue but the 47 employees with health insurance makes you prouder
2. That problem you solved for yourself now has 10,000 customers paying monthly
3. The company that rejected your application now offered to acquire you for 8 figures
4. Your team sends thank-you notes about how working for you changed their lives
5. You remember crying after being laid off - now you create job security for others

[STORY]
It feels so good. Everything I dreamed about came true.

No more begging for opportunities. No more sleepless nights about money. Just impact.

5:30 AM. Check metrics. $2M revenue. But I smile at different number. 47 employees with health insurance. "Thank you, universe."

Problem I solved for myself? 10,000 customers pay monthly for it now. Remember when nobody returned my calls? Gone.

My mind is quiet. Focused. Building.

Competitor emails. Wants to meet. Same guy who ignored me three years ago. The struggle is over.

"We can afford it." The new office. The team retreat. The employee bonuses. Every time.

Team member stops by. Tears. "Working here changed my life." "Thank you," I whisper back. This is why.

That company that rejected me? They offered 8 figures to acquire us. I said no. Felt incredible.

Evening in my designed office. Remember crying in the car after getting laid off? That person built all this.

"Thank you. Thank you. Thank you." 47 families have security because I didn't give up. This is it.

There is so much to love and experience on this earth. And now, I finally can.

[SCHEDULE]
[MORNING]
5:30 AM: Wake up: Excited about the day
6:00 AM: Exercise: Clearing mind for big decisions
7:00 AM: Strategic thinking: Before the noise starts
8:30 AM: Team check-in: Setting daily priorities

[DAY]
9:00 AM: Deep work: Product development and innovation
11:00 AM: Leadership: 1-on-1s with key team members
1:00 PM: Power lunch: Building strategic partnerships
3:00 PM: Customer focus: Feedback and improvements
4:30 PM: Growth planning: Scaling strategies

[EVENING]
5:30 PM: Wind down: Review wins and lessons
6:30 PM: Personal time: Family, friends, or hobbies
8:00 PM: Learning: Books, podcasts, or courses
9:30 PM: Reflection: Gratitude and tomorrow's vision
10:30 PM: Rest: Sleeping soundly, problems solved`;
}

function generateCreativeDreamStory(dreamLife) {
  return `[AHA_MOMENTS]
1. Your Milan installation sold for more than your previous annual salary
2. That 'too weird' piece got featured in MoMA - galleries pre-order work you haven't conceived
3. You declined a celebrity commission because it didn't align with your artistic evolution
4. Art students cite you in thesis papers - your workshop spawned 10,000 artists supporting each other
5. People said 'art doesn't pay' - now you fund scholarships while living from your passion

[STORY]
It feels so good. Everything I dreamed about came true.

No more "real job" pressure. No more creating for others' approval. Just art.

7 AM. Studio light. Perfect. "Thank you, universe." My hands know what to do now.

Email from Milan. Installation sold. More than my old annual salary. But I'm sketching. The money is secondary now.

My mind is quiet. Creating. Flowing.

"Too weird," they said. Same piece in MoMA newsletter today. Remember when I almost quit? Gone.

Celebrity commission request. Doesn't align with my vision. "No thanks." Waiting list grows longer. The struggle is over.

"We can afford it." The rare pigments. The bigger studio. The experimental materials. Create freely.

Student emails. Citing me in thesis. "Thank you," I whisper. My workshop spawned 10,000 artists supporting each other.

Evening. Surrounded by my work. "Art doesn't pay," they said. I fund three scholarships now.

"Thank you. Thank you. Thank you." Living entirely from what feeds my soul. This is it.

There is so much to love and experience on this earth. And now, I finally can.

[SCHEDULE]
[MORNING]
7:00 AM: Wake with inspiration: Capture dream ideas
7:30 AM: Morning pages: Stream of consciousness
8:30 AM: Studio time: Creating while fresh
11:00 AM: Business tasks: Emails and planning

[DAY]
12:00 PM: Gallery lunch: Discussing upcoming shows
2:00 PM: Deep creation: Lost in the flow state
4:00 PM: Mentoring: Virtual session with emerging artists
5:00 PM: Documentation: Photographing today's work

[EVENING]
6:00 PM: Inspiration walk: Gathering new ideas
7:30 PM: Cultural immersion: Gallery, theater, or reading
9:00 PM: Reflection: Journaling the day's insights
10:00 PM: Rest: Dreams preparing tomorrow's art`;
}