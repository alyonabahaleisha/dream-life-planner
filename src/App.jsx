import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { onAuthStateChanged, setPersistence, browserLocalPersistence, getRedirectResult } from 'firebase/auth';
import DreamInput from './components/DreamInput/DreamInput';
import StoryResponse from './components/DreamInput/StoryResponse';
import AuthButtons from './components/AuthButtons';
import { Button } from './components/ui/button';
import { generateStory, generateDalleImage, generateStabilityImage } from './services/openai';
import { auth } from './config/firebase';
import dreamBg from './assets/dream-bg.png';

function App() {
  const [dreamLife, setDreamLife] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [imageModel, setImageModel] = useState('dalle');
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  const textareaRef = useRef(null);

  // Check for redirect result when component mounts
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        console.log('Checking redirect result...');
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Redirect successful:', result.user.email);
          setUser(result.user);
        } else {
          console.log('No redirect result');
        }
      } catch (error) {
        console.error('Redirect error:', error);
      }
    };

    checkRedirect();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth listener...');
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed. Current user:', currentUser?.email);
      setUser(currentUser);
      setAuthInitialized(true);
    });

    // Get current user immediately
    const currentUser = auth.currentUser;
    console.log('Initial auth check. Current user:', currentUser?.email);

    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    console.log('Auth success called with user:', userData?.email);
    setUser(userData);
  };

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await auth.signOut();
      setUser(null);
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Handle redirect result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Redirect result user:', result.user.email);
          setUser(result.user);
        }
      } catch (error) {
        console.error('Error getting redirect result:', error);
      }
    };

    handleRedirectResult();
  }, []);

  // Set up auth persistence and state listener
  useEffect(() => {
    const initialize = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log('Auth state changed:', currentUser?.email);
          setUser(currentUser);
          setAuthInitialized(true);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error setting up auth:', error);
        setAuthInitialized(true);
      }
    };

    initialize();
  }, []);

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
    localStorage.setItem('dreamLife', dreamLife);
    
    try {
      const generateImage = imageModel === 'dalle' ? generateDalleImage : generateStabilityImage;
      generateImage(dreamLife).then(imageData => {
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

 


  // Don't render until auth is initialized
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

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
        
        <div className="min-h-screen relative flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${dreamBg})`,
            }}
          />
          
          <div className="absolute top-0 left-0 w-full z-10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src="/dream-life-planner/icon.png" 
                  alt="Dream Life Planner" 
                  className="w-8 h-8" 
                />
                <span className="text-xl font-medium text-gray-800">
                  Dream Life Planner
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700">
                      {user.email}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <AuthButtons onAuthSuccess={handleAuthSuccess} />
                )}
              </div>
            </div>
          </div>
          
          <div className="relative z-10 w-full p-4">
            {!showResponse ? (
              <>
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
      </>
    </HelmetProvider>
  );
}

export default App;