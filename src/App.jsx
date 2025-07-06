// src/App.jsx
import { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import DreamInput from './components/DreamInput/DreamInput';
import StoryResponse from './components/DreamInput/StoryResponse';
import StoryResponseEnhanced from './components/DreamInput/StoryResponseEnhanced';
import PaywallDialog from './components/PaywallDialog';
import DreamAuthDialog from './components/DreamAuthDialog';
import { generateStory, generateDalleImage } from './services/api';
import { dreamTrackingService } from './services/dreamTracking';
import { useUsageTracking } from './hooks/useUsageTracking';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
import { AlertCircle } from 'lucide-react';

function App() {
  const [dreamLife, setDreamLife] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState(null);
  const [useEnhancedStory, setUseEnhancedStory] = useState(true); // Toggle this to switch versions
  
  const textareaRef = useRef(null);
  const {
    usageStatus,
    showPaywall,
    showAuthPrompt,
    handleUsageError,
    closePaywall,
    closeAuthPrompt,
    checkUsage
  } = useUsageTracking();

  useEffect(() => {
    // Usage is checked automatically by the hook
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Check if user can make more requests
      if (!usageStatus.canUseMore && !usageStatus.isPremium) {
        handleUsageError({
          requiresPaywall: !usageStatus.isAnonymous,
          requiresAuth: usageStatus.isAnonymous
        });
        return;
      }

      // Proceed with dream generation
      setIsLoading(true);
      setStory('');
      setImage(null);
      setShowResponse(true);
      localStorage.setItem('dreamLife', dreamLife);

      // Generate image (if available)
      generateDalleImage(dreamLife, handleUsageError).then(imageData => {
        if (imageData) {
          setImage(imageData);
        }
      });

      // Generate story with usage tracking
      await generateStory(dreamLife, (chunk) => {
        setStory(prev => prev + chunk);
      }, handleUsageError);

      // Refresh usage status after successful generation
      checkUsage(true);
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
                usageStatus={usageStatus}
              />
            ) : (
              useEnhancedStory ? (
                <StoryResponseEnhanced
                  story={story}
                  image={image}
                  isLoading={isLoading}
                  onReset={handleReset}
                />
              ) : (
                <StoryResponse
                  story={story}
                  image={image}
                  isLoading={isLoading}
                  onReset={handleReset}
                />
              )
            )}
          </div>
        </div>

        <PaywallDialog 
          isOpen={showPaywall} 
          onClose={closePaywall} 
        />
        
        <DreamAuthDialog
          isOpen={showAuthPrompt}
          onClose={closeAuthPrompt}
        />
      </>
    </HelmetProvider>
  );
}

export default App;