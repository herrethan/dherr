'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ContentfulAsset } from '@/types/contentful';
import ImageCarousel from './ImageCarousel';

interface WorkGridProps {
  images: ContentfulAsset[];
  title: string;
}

function WorkGrid({ images, title }: WorkGridProps) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setCarouselOpen(true);
  };

  return (
    <>
      {/* Work items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {images.length > 0 ? (
          images.map((item: ContentfulAsset, index: number) => (
            <div 
              key={item.sys.id || index} 
              className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(index)}
            >
              {item.fields?.file?.url ? (
                <Image
                  width={800}
                  height={800}
                  src={item.fields.file.url.startsWith('//') ? `https:${item.fields.file.url}` : item.fields.file.url} 
                  alt={item.fields.title || `${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500">
                  {title.charAt(0).toUpperCase() + title.slice(1)} {index + 1}
                </span>
              )}
            </div>
          ))
        ) : (
          // Fallback placeholder grid
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                {title.charAt(0).toUpperCase() + title.slice(1)} {item}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Image Carousel Dialog */}
      <ImageCarousel
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
        title={title}
      />
    </>
  );
}

export default WorkGrid;
