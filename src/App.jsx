// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import DreamInput from './components/DreamInput/DreamInput';
import StoryResponse from './components/DreamInput/StoryResponse';
import PaywallDialog from './components/PaywallDialog';
import { generateStory, generateDalleImage } from './services/api';
import { dreamTrackingService } from './services/dreamTracking';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
import { AlertCircle } from 'lucide-react';
import dreamBg from './assets/dream-bg.png';

function App() {
  const [dreamLife, setDreamLife] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [error, setError] = useState(null);
  const [dreamStatus, setDreamStatus] = useState(null);
  
  const textareaRef = useRef(null);

  useEffect(() => {
    // Check dream submission status on component mount
    const checkDreamStatus = async () => {
      try {
        const status = await dreamTrackingService.canSubmitDream();
        setDreamStatus(status);
      } catch (error) {
        console.error('Error checking dream status:', error);
        setError('Unable to check dream submission status');
      }
    };

    checkDreamStatus();
  }, []);

  const handleSubmit = async (e) => {
    console.log('hello >>>>>', e)
    e.preventDefault();
    setError(null);
    
    try {
      console.log('trackingResult >>>>>')
      // Track dream submission
      const trackingResult = await dreamTrackingService.trackDreamSubmission(dreamLife);
      console.log('trackingResult >>>>>', trackingResult)
      if (!trackingResult.success) {
        setShowPaywall(true);
        return;
      }

      // Proceed with dream generation
      setIsLoading(true);
      setStory('');
      setImage(null);
      setShowResponse(true);
      localStorage.setItem('dreamLife', dreamLife);

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
      setError('Failed to generate dream content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResponse(false);
    setDreamLife('');
    setStory('');
    setImage(null);
    setError(null);
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
            {error && (
              <Alert variant="destructive" className="mb-6 max-w-3xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!showResponse ? (
              <DreamInput
                dreamLife={dreamLife}
                setDreamLife={setDreamLife}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                textareaRef={textareaRef}
                remainingDreams={dreamStatus?.remainingDreams}
                error={error}
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

        <PaywallDialog 
          isOpen={showPaywall} 
          onClose={() => setShowPaywall(false)} 
        />
      </>
    </HelmetProvider>
  );
}

export default App;