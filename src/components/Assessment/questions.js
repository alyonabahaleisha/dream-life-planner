// src/components/Assessment/questions.js

export const predefinedQuestions = [
    {
      id: 'gender',
      section: 'Personal Information',
      question: "How do you identify?",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Non-binary", value: "non_binary" },
        { label: "Prefer not to say", value: "prefer_not_say" }
      ]
    },
    {
      id: 'age',
      section: 'Personal Information',
      question: "What is your age range?",
      options: [
        { label: "18-24", value: "18-24" },
        { label: "25-34", value: "25-34" },
        { label: "35-44", value: "35-44" },
        { label: "45-54", value: "45-54" },
        { label: "55+", value: "55+" }
      ]
    },
    {
      id: 'employment',
      section: 'Work and Career',
      question: "What best describes your current employment situation?",
      options: [
        { label: "Full-time employee", value: "full_time" },
        { label: "Part-time employee", value: "part_time" },
        { label: "Self-employed/Freelancer", value: "self_employed" },
        { label: "Business owner", value: "business_owner" },
        { label: "Not currently employed", value: "unemployed" }
      ]
    },
    {
      id: 'income',
      section: 'Work and Career',
      question: "What is your approximate annual income?",
      options: [
        { label: "Under $30,000", value: "under_30k" },
        { label: "$30,000 - $60,000", value: "30k_60k" },
        { label: "$60,000 - $100,000", value: "60k_100k" },
        { label: "$100,000 - $150,000", value: "100k_150k" },
        { label: "Over $150,000", value: "over_150k" }
      ]
    },
    {
      id: 'relationship',
      section: 'Family and Relationships',
      question: "What's your current relationship status?",
      options: [
        { label: "Single", value: "single" },
        { label: "In a relationship", value: "relationship" },
        { label: "Married", value: "married" },
        { label: "Divorced/Separated", value: "divorced" },
        { label: "Prefer not to say", value: "prefer_not_say" }
      ]
    },
    {
      id: 'side_hustle',
      section: 'Side Hustles',
      question: "Do you currently have any side hustles or additional income streams?",
      options: [
        { label: "No side hustles currently", value: "none" },
        { label: "Yes, earning some extra income", value: "active" },
        { label: "Planning to start soon", value: "planning" },
        { label: "Interested but haven't started", value: "interested" }
      ]
    },
    {
      id: 'free_time',
      section: 'Time Management',
      question: "How much free time do you typically have per day?",
      options: [
        { label: "Less than 1 hour", value: "less_1" },
        { label: "1-2 hours", value: "1_2" },
        { label: "2-4 hours", value: "2_4" },
        { label: "4+ hours", value: "4_plus" }
      ]
    },
    {
      id: 'primary_goal',
      section: 'Aspirations',
      question: "What's your primary goal for the next year?",
      options: [
        { label: "Career advancement", value: "career" },
        { label: "Financial growth", value: "financial" },
        { label: "Better work-life balance", value: "balance" },
        { label: "Start a business", value: "business" },
        { label: "Personal development", value: "personal" }
      ]
    },
    {
      id: 'biggest_obstacle',
      section: 'Aspirations',
      question: "What's your biggest obstacle in achieving your goals?",
      options: [
        { label: "Lack of time", value: "time" },
        { label: "Financial constraints", value: "financial" },
        { label: "Limited knowledge/skills", value: "skills" },
        { label: "Fear of failure", value: "fear" },
        { label: "Lack of support", value: "support" }
      ]
    }
  ];