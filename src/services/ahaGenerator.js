// AHA Moments Generator - Creates personalized breakthrough moments based on specific dreams

export const generatePersonalizedAHAMoments = (dreamText) => {
  // Analyze dream keywords to determine dream type and personalization
  const dreamLower = dreamText.toLowerCase();
  
  // Extract key elements from the dream
  const dreamElements = {
    hasFamily: dreamLower.includes('family') || dreamLower.includes('kids') || dreamLower.includes('children'),
    hasTravel: dreamLower.includes('travel') || dreamLower.includes('world') || dreamLower.includes('nomad'),
    hasBusiness: dreamLower.includes('business') || dreamLower.includes('entrepreneur') || dreamLower.includes('company'),
    hasCreative: dreamLower.includes('write') || dreamLower.includes('art') || dreamLower.includes('create') || dreamLower.includes('music'),
    hasWealth: dreamLower.includes('wealth') || dreamLower.includes('rich') || dreamLower.includes('financial freedom'),
    hasHealth: dreamLower.includes('health') || dreamLower.includes('fit') || dreamLower.includes('wellness'),
    hasImpact: dreamLower.includes('help') || dreamLower.includes('impact') || dreamLower.includes('change') || dreamLower.includes('difference'),
    hasRemote: dreamLower.includes('remote') || dreamLower.includes('location') || dreamLower.includes('anywhere'),
    hasTech: dreamLower.includes('tech') || dreamLower.includes('startup') || dreamLower.includes('app') || dreamLower.includes('software'),
  };

  // Generate personalized AHA moments based on dream elements
  const ahaMoments = [];

  // Morning/Energy AHA
  if (dreamElements.hasFamily) {
    ahaMoments.push("Your kids see you as their hero, not because of what you buy them, but because you're fully present during breakfast conversations about their dreams");
  } else if (dreamElements.hasCreative) {
    ahaMoments.push("You wake up at 5 AM not because you have to, but because the creative ideas flowing through your mind won't let you sleep any longer");
  } else if (dreamElements.hasBusiness) {
    ahaMoments.push("Monday mornings feel like Christmas morning because you can't wait to see how your business grew while you were sleeping");
  } else {
    ahaMoments.push("You haven't set an alarm in months because your body naturally wakes up energized, knowing something amazing is about to happen");
  }

  // Work/Passion AHA
  if (dreamElements.hasTech && dreamElements.hasImpact) {
    ahaMoments.push("Your code doesn't just solve problems anymore - it changes lives, and the thank you emails from users around the world prove it every single day");
  } else if (dreamElements.hasCreative && dreamElements.hasWealth) {
    ahaMoments.push("That art piece you created from pure joy just sold for more than your old annual salary - and the buyer said it changed their life");
  } else if (dreamElements.hasBusiness && dreamElements.hasRemote) {
    ahaMoments.push("You closed a $100K deal from a beach cafe in Bali, then spent the afternoon teaching local kids to surf - this is what work looks like now");
  } else if (dreamElements.hasImpact) {
    ahaMoments.push("The nonprofit you started just hit 10,000 people helped, and each story of transformation reminds you why you left your corporate job");
  } else {
    ahaMoments.push("Your 'work' has become so aligned with your purpose that friends joke you'd do it for free - little do they know, you almost feel guilty taking money for it");
  }

  // Power/Choice AHA
  if (dreamElements.hasWealth && dreamElements.hasBusiness) {
    ahaMoments.push("You just turned down a $500K acquisition offer for your business because you're having too much fun growing it - and you didn't even need to check your bank balance first");
  } else if (dreamElements.hasCreative) {
    ahaMoments.push("A major publisher offered you a deal, but you declined because you prefer the creative freedom of self-publishing - and you're making twice as much anyway");
  } else if (dreamElements.hasTravel) {
    ahaMoments.push("You said no to a high-paying project because it would interfere with your 3-month Southeast Asia adventure - and felt zero financial stress about it");
  } else {
    ahaMoments.push("When the headhunter called with a 'dream job' offering double your old salary, you politely declined - because you're already living your actual dream");
  }

  // Social/Influence AHA
  if (dreamElements.hasFamily && dreamElements.hasBusiness) {
    ahaMoments.push("Your teenage daughter asked to shadow you for a school project on 'inspiring careers' - she chose you over her friend's CEO parent");
  } else if (dreamElements.hasImpact && dreamElements.hasTravel) {
    ahaMoments.push("In every city you visit, there's someone whose life you've touched waiting to buy you coffee and share how you inspired their transformation");
  } else if (dreamElements.hasCreative && dreamElements.hasImpact) {
    ahaMoments.push("Your Instagram DMs are filled with people saying your work gave them courage to pursue their dreams - you've become accidentally influential");
  } else if (dreamElements.hasTech) {
    ahaMoments.push("Junior developers across the world list you as their role model, not because you're famous, but because you took time to mentor them online");
  } else {
    ahaMoments.push("Old colleagues keep reaching out asking 'what's your secret?' - they can't understand how you transformed from stressed to serene so completely");
  }

  // Ultimate Achievement AHA
  if (dreamElements.hasFamily && dreamElements.hasWealth) {
    ahaMoments.push("Your investment portfolio generates enough passive income to cover your family's lifestyle twice over - you work now purely for the joy and impact of it");
  } else if (dreamElements.hasTravel && dreamElements.hasBusiness) {
    ahaMoments.push("Forbes featured your 'laptop lifestyle' business as a case study, but you were too busy exploring Machu Picchu to notice until a week later");
  } else if (dreamElements.hasCreative && dreamElements.hasWealth) {
    ahaMoments.push("Your creative work is displayed in galleries you used to dream of visiting - and collectors are bidding against each other for your next piece");
  } else if (dreamElements.hasImpact) {
    ahaMoments.push("The UN invited you to speak about your innovative approach to change - the same organization you wrote essays about in college is now learning from you");
  } else {
    ahaMoments.push("You realized you haven't checked job listings in two years - not because you found a job, but because you created a life where 'job' is an obsolete concept");
  }

  return ahaMoments;
};

// Enhanced prompt for AI to generate deeply personal AHA moments
export const getPersonalizedAHAPrompt = (dreamText) => {
  return `
    Create 5 deeply personal "AHA moments" based on this specific dream. These should be breakthrough realizations that show the transformation from current life to dream life.

    USER'S DREAM: "${dreamText}"

    REQUIREMENTS FOR EACH AHA MOMENT:
    1. Length: 20-30 words (longer than typical, more specific)
    2. Include specific details from their dream
    3. Show transformation, not just achievement
    4. Include emotional or relationship elements
    5. Reference specific numbers, places, or scenarios when possible
    6. Make it feel achievable but transformative
    7. Focus on identity shift, not just external success

    ANALYZE THE DREAM FOR:
    - Specific roles mentioned (parent, creator, entrepreneur, etc.)
    - Locations or lifestyle preferences
    - Current pain points they're trying to escape
    - Relationships or community desires
    - Creative or professional aspirations
    - Values and what matters to them

    STRUCTURE:
    - AHA 1: Morning/Energy transformation (how they start their day differently)
    - AHA 2: Work/Passion alignment (how work became play)
    - AHA 3: Power/Choice moment (saying no from abundance)
    - AHA 4: Social/Influence shift (how others see them now)
    - AHA 5: Ultimate realization (the biggest identity shift)

    EXAMPLE for someone who wants to "quit corporate job and travel while building online business":
    1. "You're watching the sunrise in Santorini while your team in Manila handles client calls - and everyone prefers this arrangement including your clients"
    2. "Your 'office' today is a treehouse cafe in Ubud, and you just made more in one morning than your old job paid in a week"
    3. "You declined a $200K corporate consulting contract because it required being in one city for 6 months - and your passive income made it an easy choice"
    4. "Your former boss just asked you to mentor her daughter who wants to escape the 9-5 - she said you're living proof it's possible"
    5. "You realized you haven't asked 'is it Friday yet?' in two years because Monday in Morocco feels as good as Friday in Manhattan ever did"

    Now create 5 AHA moments specifically for this dream. Make them personal, specific, and emotionally resonant.
  `;
};