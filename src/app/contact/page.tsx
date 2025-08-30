import Contact from '@/components/Contact';

import client from '@/lib/contentful';
import { renderRichText } from '@/lib/render-rich-text';
import { cn } from '@/lib/utils';
import { Contact as ContactType } from '@/types/contentful';

async function getContactPage() {
  const contactPage = await client.getEntries({
    content_type: 'contact',
  });
  return contactPage.items[0] as ContactType;
}

export default async function ContactPage() {
  const contactPage = await getContactPage();
  const backgroundImage = contactPage?.fields.background;

  return (
    <main className={cn(
      'min-h-screen flex items-center justify-center px-4',
      backgroundImage ? 'bg-cover bg-center bg-no-repeat' : ''
    )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage.fields.file.url})`
      } : undefined}
    >
      {/* Dark overlay for dark mode */}
      <div className="absolute inset-0 bg-black/0 dark:bg-black/70 transition-colors duration-300 pointer-events-none" />
      <h1 className="sr-only">
        {contactPage?.fields?.title || 'Contact'}
      </h1>
      <div className="relative bg-white/90 dark:bg-black/80 -translate-y-32 max-w-md w-full mx-auto p-4">
      {contactPage?.fields?.content && (
        <div className="prose mb-4">
          {renderRichText(contactPage.fields.content.content)}
        </div>
      )}
        <Contact />
      </div>
    </main>
  );
}
