'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ContentfulAsset } from '@/types/contentful';

interface ImageCarouselProps {
  images: ContentfulAsset[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ImageCarousel({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose, 
  title 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    console.log('Background clicked');
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={handleBackgroundClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Close carousel"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Previous image"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Next image"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main image container */}
      <div className="relative flex items-center justify-center w-auto">
        {currentImage.fields?.file?.url ? (
          <>
            <Image
              src={currentImage.fields.file.url.startsWith('//') ? `https:${currentImage.fields.file.url}` : currentImage.fields.file.url}
              alt={currentImage.fields.title || `${title} ${currentIndex + 1}`}
              width={1200}
              height={1200}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] object-contain"
              priority
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-xs">
                {currentImage.fields.title || `${title} ${currentIndex + 1}`}
              </p>
            </div>
          </>
        ) : (
          <div className="text-white text-center">``
            <p>Image not available</p>
          </div>
        )}
      </div>

    </div>
  );
}
