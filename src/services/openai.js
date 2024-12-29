const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Story generation
export const generateStory = async (dreamLife, onChunk) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Act as a professional business and life coach with 1000 of successful cases and Based on this dream life description: "${dreamLife}", create:
            1. A vivid and inspiring reals like story (2-3 paragraphs) about a day in person's life, making it feel attainable yet aspirational
            2. A detailed schedule for their typical day, organized into morning, day, and evening sections.
            
            Format the response EXACTLY like this example:

            [STORY]
            Your story here...

            [SCHEDULE]
            [MORNING]
            6:00 AM: Wake up: Start the day with meditation
            7:30 AM: Breakfast: Enjoy healthy meal with family
            9:00 AM: Exercise: Personal training session

            [DAY]
            11:00 AM: Meetings: Connect with team virtually
            1:00 PM: Lunch: Business meeting at upscale restaurant
            3:00 PM: Creative Time: Work on new projects

            [EVENING]
            5:00 PM: Family Time: Quality time with loved ones
            7:00 PM: Dinner: Gourmet meal at home
            9:00 PM: Relaxation: Wind down with a book

            Make sure each schedule entry follows the exact format "TIME: Activity: Description" using 12-hour time format (e.g., 6:00 AM, 2:30 PM).`
          }
        ]
      })
    });

    const data = await response.json();
    const story = data.choices[0].message.content;
    
    await simulateHumanTyping(story, onChunk);
    return story;
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};

// Image generation with DALL-E
export const generateDalleImage = async (dreamLife) => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Create a professional, photorealistic lifestyle photograph representing: ${dreamLife}. 
        Style: High-end cinematic photography, natural lighting, shallow depth of field, 
        rich colors, luxury magazine quality. Focus on aspirational but attainable lifestyle moments.
        Shot on medium format camera, editorial aesthetic, ultra HD quality.`,
        size: "1792x1024",
        quality: "standard",
        style: "natural"
      })
    });

    const data = await response.json();
    return {
      url: data.data[0].url,
      type: 'dalle'
    };
  } catch (error) {
    console.error('Error generating DALL-E image:', error);
    return null;
  }
};

// Image generation with Stability AI
export const generateStabilityImage = async (dreamLife) => {
  try {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `Professional cinematic photograph of ${dreamLife}. 
            Photorealistic, luxury lifestyle, shallow depth of field, rich colors, 
            high-end magazine quality, editorial photography style, wide cinematic shot.`,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 320,
        width: 704,
        samples: 1,
        steps: 50
      })
    });

    const data = await response.json();
    return {
      url: `data:image/png;base64,${data.artifacts[0].base64}`,
      type: 'stability'
    };
  } catch (error) {
    console.error('Error generating Stability image:', error);
    return null;
  }
};

// Assessment questions generation
export const generateQuestions = async (dreamLife) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Return responses in clean JSON format without markdown formatting or backticks."
          },
          {
            role: "user",
            content: `Act as a professional business and life coach with 1000 of successful cases and generate 15 specific questions based on this dream life target: "${dreamLife}". Focus on understanding current values, skills, finances, time availability, background, and timeline expectations. Return an array of questions in this exact format:
            [
              {
                "id": "q1",
                "section": "Current Skills",
                "question": "question text here",
                "options": [
                  {"label": "option 1", "value": "value1"},
                  {"label": "option 2", "value": "value2"},
                  {"label": "option 3", "value": "value3"},
                  {"label": "option 4", "value": "value4"}
                ]
              }
            ]`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(response.status === 429 ? 'Rate limit exceeded' : `API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response');
    }

    const content = data.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedContent);
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return null;
  }
};

const formatGeneratedAnswers = (answers, questions) => {
  return Object.entries(answers)
    .filter(([key]) => key.startsWith('generated_'))
    .map(([key, value]) => {
      const question = questions.find(q => `generated_${q.id}` === key);
      if (!question) return null;
      const option = question.options.find(opt => opt.value === value);
      return `${question.question}: ${option?.label || value}`;
    })
    .filter(Boolean)
    .join('\n');
};

const parseRoadmapResponse = (content) => {
  // Initialize timeline structure
  const timeline = [
    {
      name: "Financial Planning",
      color: "bg-cyan-600",
      years: Array(6).fill(null)
    },
    {
      name: "Business Growth",
      color: "bg-indigo-600",
      years: Array(6).fill(null)
    },
    {
      name: "Skill Development",
      color: "bg-blue-500",
      years: Array(6).fill(null)
    },
    {
      name: "Life Goals",
      color: "bg-emerald-600",
      years: Array(6).fill(null)
    },
    {
      name: "Future Vision",
      color: "bg-green-600",
      years: Array(6).fill(null)
    }
  ];

  // Split content into timeline and phases parts
  const parts = content.split('PART 2:');
  if (!parts[0]) return timeline;

  // Process timeline tracks
  const trackSections = parts[0].split('[TRACK:').slice(1);
  
  trackSections.forEach(section => {
    const trackName = section.split(']')[0].trim();
    const trackIndex = timeline.findIndex(t => t.name === trackName);
    if (trackIndex === -1) return;

    // Extract year entries
    const yearLines = section.split('\n')
      .map(line => line.trim())
      .filter(line => /^\d{4}:/.test(line));

    yearLines.forEach(line => {
      const [year, content] = line.split(':').map(s => s.trim());
      const yearIndex = parseInt(year) - 2024;
      if (yearIndex < 0 || yearIndex >= 6) return;

      const [title, description] = content.split('|').map(s => s.trim());
      
      timeline[trackIndex].years[yearIndex] = {
        title,
        description
      };
    });
  });

  return timeline;
};

// Roadmap generation
// export const generateRoadmap = async (dreamLife, answers) => {
//   try {
//     const questionsList = await generateQuestions(dreamLife);
//     const generatedAnswersText = formatGeneratedAnswers(answers, questionsList);

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4-0125-preview",
//         messages: [
//           {
//             role: "user",
//             content: `Act as a professional business and life coach with 1000 of successful cases and Based on these answers "${JSON.stringify(answers)}" and this dream target "${dreamLife}", create a detailed roadmap to achieve this life.

// Current Profile Summary:
// ${Object.entries(answers)
//   .filter(([key]) => !key.startsWith('generated_'))
//   .map(([key, value]) => `${key}: ${value}`)
//   .join('\n')}

// Detailed Assessment:
// ${generatedAnswersText}

// Structure the roadmap in phases (Phase One, Phase Two, etc.), with each phase containing month-based sections.
// For each time period, include:
// - Clear "Objective:" for the period
// - Specific "Actions:" as bullet points
// - Make sure to cover these aspects across the timeline:
//   1. Financial goals and milestones
//   2. Business development and growth
//   3. Skill development and learning
//   4. Life/family balance strategies
//   5. Future vision and legacy planning

// Format example:
// Phase One: Foundation (Months 1-6)
// Month 1-2:
// Objective: Build emergency fund and financial base
// Actions:
// • Save 20% of current income
// • Create investment strategy
// • Research market opportunities

// Format the response with clear Phase sections (Phase One, Phase Two, etc.) and
// within each phase, use "Month X-Y:" headers for different time periods.
// For each time period, include "Objective:" and "Actions:" subsections.`
//           }
//         ]
//       })
//     });

//     const data = await response.json();
//     const roadmapContent = data.choices[0].message.content;
    
//     // Parse the response into timeline data
//     const timelineData = parseRoadmapResponse(roadmapContent);

//     return {
//       content: roadmapContent,
//       timeline: timelineData
//     };
//   } catch (error) {
//     console.error('Error generating roadmap:', error);
//     return null;
//   }
// };

export const generateRoadmap = async (dreamLife, answers) => {
  try {
    const questionsList = await generateQuestions(dreamLife);
    const generatedAnswersText = formatGeneratedAnswers(answers, questionsList);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional life and business coach with expertise in creating detailed, actionable roadmaps. Structure your responses clearly with specific objectives and actions for each time period."
          },
          {
            role: "user",
            content: `Based on these answers "${JSON.stringify(answers)}" and this dream target "${dreamLife}", create a detailed 6-year roadmap organized into five parallel tracks.

Current Profile Summary:
${Object.entries(answers)
  .filter(([key]) => !key.startsWith('generated_'))
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Detailed Assessment:
${generatedAnswersText}

Structure the response in two parts:

PART 1: TIMELINE TRACKS
Provide specific milestones and actions for each track across 6 years (2024-2029). Format exactly as follows:

[TRACK: FINANCIAL PLANNING]
2024: Build Emergency Fund | Establish financial baseline and savings habits
2025: Investment Strategy | Develop diversified investment portfolio
2026: Revenue Goals | Set and achieve major financial milestones
...

[TRACK: BUSINESS GROWTH]
2024: Market Research | Identify profitable business opportunities
2025: First Business Launch | Establish and grow initial venture
2026: Scale Operations | Expand business reach and revenue
...

[TRACK: SKILL DEVELOPMENT]
2024: Core Skills | Master fundamental business and technical skills
2025: Advanced Training | Develop leadership and management expertise
2026: Specialization | Focus on industry-specific knowledge
...

[TRACK: LIFE GOALS]
2024: Foundation | Establish healthy work-life balance
2025: Family Planning | Create stable personal life structure
2026: Achievement | Reach key personal milestones
...

[TRACK: FUTURE VISION]
2024: Planning | Set long-term wealth building strategy
2025: Implementation | Execute on future security plans
2026: Expansion | Develop legacy and growth opportunities
...

PART 2: DETAILED ROADMAP
Then provide a detailed breakdown in phases:

Phase One: Foundation (Months 1-6)
Month 1-2:
Objective: [Clear objective here]
Actions:
• [Specific action step]
• [Specific action step]
• [Specific action step]

Include 3-4 phases total, each broken down into specific months with clear objectives and actions.`
          }
        ]
      })
    });

    const data = await response.json();
    const roadmapContent = data.choices[0].message.content;
    
    // Parse the response into timeline data
    const timelineData = parseRoadmapResponse(roadmapContent);

    return {
      content: roadmapContent,
      timeline: timelineData
    };
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return null;
  }
};

const simulateHumanTyping = async (text, onChunk) => {
  const words = text.split(' ');
  for (const word of words) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 20));
    onChunk(word + ' ');
  }
};

// Milestone generation
export const generateMilestones = async (dreamLife, answers) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional life coach specializing in helping people achieve ambitious life goals through clear, actionable milestones. Return only valid JSON arrays without any additional text, markdown formatting, or explanation."
          },
          {
            role: "user",
            content: `Based on this dream life story: "${dreamLife}" and these life assessment answers: ${JSON.stringify(answers)}, identify 5-7 major milestones that represent significant achievements needed to realize this dream life. Each milestone should be ambitious yet achievable.

Format the response as a JSON array of objects, each containing:
{
  "title": "Milestone title",
  "timeframe": "Expected timeframe",
  "description": "Brief explanation of the milestone",
  "progress": 0
}

Keep descriptions concise and actionable. Include specific metrics where possible.`
          }
        ]
      })
    });

    const data = await response.json();
    try {
      const content = data.choices[0].message.content;
      
      // Extract JSON array from the response
      const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON array found, try parsing the whole content
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing milestones:', error);
      return [];
    }
  } catch (error) {
    console.error('Error generating milestones:', error);
    return [];
  }
};

// Action plan generation
export const generate30DayPlan = async (dreamLife, answers, milestones) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional life coach specializing in creating focused, actionable daily tasks. Return only valid JSON arrays without any additional text or markdown formatting."
          },
          {
            role: "user",
            content: `Based on this dream life story: "${dreamLife}", 
            life assessment answers: ${JSON.stringify(answers)},
            and these milestones: ${JSON.stringify(milestones)},
            create a 30-day action plan with ONE focused task per day.

            Each day's task should:
            1. Be specific and achievable within that day
            2. Build progressively towards the major milestones
            3. Include clear success metrics
            4. List required resources or tools
            5. Have an estimated time commitment

            Format the response as a JSON array of days:
            [
              {
                "day": 1,
                "task": "Specific task description",
                "estimatedTime": "2 hours",
                "priority": "High/Medium/Low",
                "resources": ["Resource 1", "Resource 2"],
                "metrics": "How to measure success",
                "category": "Category of task (e.g., Financial, Skills, Business)",
                "milestone": "Which milestone this task contributes to"
              }
            ]

            Ensure tasks are:
            - Progressive (building on previous days)
            - Varied (mixing different aspects of the dream life goals)
            - Strategic (aligned with major milestones)
            - Realistic (achievable within the day)
            - Measurable (clear completion criteria)`
          }
        ]
      })
    });

    const data = await response.json();
    try {
      const content = data.choices[0].message.content;
      const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing action plan:', error);
      return [];
    }
  } catch (error) {
    console.error('Error generating action plan:', error);
    return [];
  }
};
