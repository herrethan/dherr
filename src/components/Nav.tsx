'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useContentful } from './ContentfulProvider';

export default function Nav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const { siteData } = useContentful();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark]);

  // Create navigation links from work items + hardcoded About and Contact
  const workLinks = siteData.work
    .filter(work => work.fields.title) // Only include work with titles
    .map(work => ({
      href: `/${work.fields.title?.toLowerCase()}`,
      label: work.fields.title,
    }));

  const hardcodedLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const links = [...workLinks, ...hardcodedLinks];

  // Use site title from Contentful if available
  const siteTitle = siteData.homePage[0]?.fields.title || 'Daniel Herr';

  return (
    <nav className="z-10 bg-white/80 dark:bg-gray-900/50 sticky top-0 backdrop-blur-sm border-b border-gray-300 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center flex-wrap">
        <div className="flex flex-wrap items-center space-x-8">
          <Link href="/" className="text-xl text-gray-900 dark:text-white">
            {siteTitle}
          </Link>
          <div className="flex items-center flex-wrap space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg transition-colors duration-100 ${
                  pathname === link.href
                    ? 'text-gray-900 dark:text-white border-b border-gray-900 dark:border-white'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-100"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <a
            href="https://instagram.com/_dherr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-100"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
