'use client';

import { createContext, useContext, ReactNode } from 'react';
import { HomePage, Work } from '@/types/contentful';

// Define the context type
interface ContentfulContextType {
  siteData: {
    homePage: HomePage[];
    work: Work[];
  };
}

const ContentfulContext = createContext<ContentfulContextType | null>(null);

export function useContentful() {
  const context = useContext(ContentfulContext);
  if (!context) {
    throw new Error('useContentful must be used within a ContentfulProvider');
  }
  return context;
}

interface ContentfulProviderProps {
  children: ReactNode;
  siteData: {
    homePage: HomePage[];
    work: Work[];
  };
}

export function ContentfulProvider({ children, siteData }: ContentfulProviderProps) {
  return (
    <ContentfulContext.Provider value={{ siteData }}>
      {children}
    </ContentfulContext.Provider>
  );
}
