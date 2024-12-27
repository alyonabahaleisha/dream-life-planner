const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Image generation with DALL-E
export const generateDalleImage = async (dreamLife) => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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
  
  // Story generation
  export const generateStory = async (dreamLife, onChunk) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `Based on this dream life description: "${dreamLife}", create:
              1. A vivid and inspiring story (2-3 paragraphs) about a day in this person's life, making it feel attainable yet aspirational
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


  export const generateQuestions = async (dreamLife) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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
              content: `Generate 10 specific questions based on this dream life: "${dreamLife}". Focus on understanding current skills, finances, time availability, background, and timeline expectations. Return an array of questions in this exact format:
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

//openai.js

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

export const generateRoadmap = async (dreamLife, answers) => {
  try {
    const questionsList = await generateQuestions(dreamLife);
    const generatedAnswersText = formatGeneratedAnswers(answers, questionsList);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Based on these answers "${JSON.stringify(answers)}" and this dream "${dreamLife}", create a detailed roadmap to achieve this life.

Current Profile Summary:
${Object.entries(answers)
  .filter(([key]) => !key.startsWith('generated_'))
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Detailed Assessment:
${generatedAnswersText}

Include in the roadmap:
1. Specific steps and timelines
2. Financial milestones
3. Business development strategies
4. Family/work balance strategies
5. Clear milestones
6. Risk mitigation plans
7. Required resources and skills
8. Support systems needed`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
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