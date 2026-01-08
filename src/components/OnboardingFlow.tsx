import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'The Problem',
    description: 'Many girls still feel unsafe — especially at night or while traveling.',
    image: 'https://images.unsplash.com/photo-1565158126913-8a71f8c16aa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdhbGtpbmclMjBhbG9uZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjU5NTc0MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'The Solution',
    description: 'Our app protects you with AI, SOS alerts, and community support.',
    image: 'https://images.unsplash.com/photo-1652739758426-56a564265f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNoaWVsZCUyMHNlY3VyaXR5fGVufDF8fHx8MTc2NjU5NTc0MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Your Privacy Matters',
    description: 'Your privacy is our priority. You control what gets shared.',
    image: 'https://images.unsplash.com/photo-1625405518637-a7adea5b77a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NrJTIwaGVhcnQlMjBwcml2YWN5fGVufDF8fHx8MTc2NjU5NTc0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row md:items-center md:justify-center">
      {/* Image Section */}
      <div className="flex-1 relative md:h-screen md:max-w-2xl">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="bg-white px-8 py-10 rounded-t-3xl -mt-8 relative z-10 md:rounded-none md:mt-0 md:flex-1 md:max-w-xl md:px-12 md:py-16">
        <h2 className="mb-4 text-gray-900">{slide.title}</h2>
        <p className="text-gray-600 mb-8">{slide.description}</p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-purple-600' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}