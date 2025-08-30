import client from '@/lib/contentful';
import Image from 'next/image';
import { About as AboutPage } from '@/types/contentful';
import { renderRichText } from '@/lib/render-rich-text';


const getAboutPage = async () => {
  const aboutPage = await client.getEntries({
    content_type: 'about',
  });
  return aboutPage.items[0] as AboutPage;
}

export default async function About() {
  const aboutPage = await getAboutPage();
  
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="sr-only">
          {aboutPage?.fields?.title || 'About'}
        </h1>

        {aboutPage?.fields?.image && (
          <figure>
            <Image src={aboutPage.fields.image.fields.file.url.startsWith('//') ? `https:${aboutPage.fields.image.fields.file.url}` : aboutPage.fields.image.fields.file.url} alt="Daniel Herr" width={1000} height={1000} className="mt-12" />
            {aboutPage.fields.image.fields.description && (
              <figcaption className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {aboutPage.fields.image.fields.description}
              </figcaption>
            )}
          </figure>
        )}
        
        <div className="text-left mt-12 mb-12 space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {aboutPage?.fields?.content && (
            <div className="prose">
              {renderRichText(aboutPage.fields.content.content)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
