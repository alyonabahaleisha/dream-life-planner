import React, { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import DreamInput from './components/DreamInput/DreamInput';
import StoryResponse from './components/DreamInput/StoryResponse';
import { generateStory, generateDalleImage } from './services/openai';
import dreamBg from './assets/dream-bg.png';

function App() {
  const [dreamLife, setDreamLife] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStory('');
    setImage(null);
    setShowResponse(true);
    localStorage.setItem('dreamLife', dreamLife);

    try {
      generateDalleImage(dreamLife).then(imageData => {
        if (imageData) {
          setImage(imageData);
        }
      });

      await generateStory(dreamLife, (chunk) => {
        setStory(prev => prev + chunk);
      });
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResponse(false);
    setDreamLife('');
    setStory('');
    setImage(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Dream Life Planner</title>
          <meta 
            name="description" 
            content="Plan and visualize your perfect dream life with AI-powered insights and personalized daily schedules." 
          />
          <link rel="icon" type="image/png" href="/icon.png" />
          <link rel="apple-touch-icon" href="/icon.png" />
        </Helmet>
        
        <div className="min-h-screen flex items-center justify-center">
          
          <div className="relative z-10 w-full p-4">
            {!showResponse ? (
              <DreamInput
                dreamLife={dreamLife}
                setDreamLife={setDreamLife}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                textareaRef={textareaRef}
              />
            ) : (
              <StoryResponse
                story={story}
                image={image}
                isLoading={isLoading}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </>
    </HelmetProvider>
  );
}

export default App;