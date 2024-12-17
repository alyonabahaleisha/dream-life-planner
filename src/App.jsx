import React, { useState, useEffect, useRef } from 'react';
import DreamInput from './components/DreamInput/DreamInput';
import StoryResponse from './components/DreamInput/StoryResponse';
import ImageModelToggle from './components/ImageModelToggle';
import { generateStory, generateDalleImage, generateStabilityImage } from './services/openai';
import dreamBg from './assets/dream-bg.png';

function App() {
  const [dreamLife, setDreamLife] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [imageModel, setImageModel] = useState('dalle'); // 'dalle' or 'stability'
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStory('');
    setImage(null);
    setShowResponse(true);

    try {
      // Start image generation based on selected model
      const generateImage = imageModel === 'dalle' ? generateDalleImage : generateStabilityImage;
      generateImage(dreamLife).then(imageData => {
        if (imageData) {
          setImage(imageData);
        }
      });

      // Generate story with typing effect
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
    <div className="min-h-screen relative flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${dreamBg})`,
        }}
      />
      
      <div className="relative z-10 w-full p-4">
        {!showResponse ? (
          <>
            <div className="w-full max-w-3xl mx-auto mb-4 flex justify-end">
              
            </div>
            <DreamInput
              dreamLife={dreamLife}
              setDreamLife={setDreamLife}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              textareaRef={textareaRef}
            />
          </>
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
  );
}

export default App;