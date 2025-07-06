import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { X, Camera, ArrowRight, Sparkles } from 'lucide-react';

const ImageReveal = ({ image, ahaMoments, onComplete, onReset }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      setTimeout(() => setShowOverlay(true), 1500);
    }
  }, [imageLoaded]);

  const handleSaveImage = () => {
    const link = document.createElement('a');
    link.href = image?.url || '';
    link.download = 'my-dream-life-vision.jpg';
    link.click();
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="absolute top-4 right-4 z-20 text-white hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="relative w-full max-w-5xl">
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Sparkles className="h-16 w-16 text-white animate-pulse mb-4" />
            <p className="text-2xl text-white font-light">Creating your vision...</p>
          </div>
        )}
        
        <img 
          src={image?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'}
          alt="Your dream life visualization"
          className={`w-full h-auto rounded-lg transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent animate-fadeIn">
            <div className="absolute bottom-0 left-0 right-0 p-12 text-center">
              <h2 className="text-5xl font-light text-white mb-6">
                This is Your Future
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                {ahaMoments[0]}
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleSaveImage}
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Save This Vision
                </Button>
                
                <Button
                  onClick={onComplete}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  See Your Daily Routine
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageReveal;