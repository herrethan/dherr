import client from '@/lib/contentful';
import { renderRichText } from '@/lib/render-rich-text';
import { HomePage } from '@/types/contentful';
import { cn } from '@/lib/utils';

// Fetch data from Contentful
async function getHomepageData() {
  try {

    const response = await client.getEntries({
      content_type: 'homePage',
    });
    
    return response.items as HomePage[];
  } catch (error) {
    console.error('Error fetching from Contentful:', error);
    return [];
  }
}

export default async function Home() {
  const contentfulData = await getHomepageData();
  const backgroundImage = contentfulData[0]?.fields.backgroundImage;
  const latestHappenings = contentfulData[0]?.fields.latestHappenings;
  
  return (
    <main 
      className={cn(
        'grow relative',
        backgroundImage ? 'bg-cover bg-center bg-no-repeat' : ''
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage.fields.file.url})`
      } : undefined}
    >
      {/* Dark overlay for dark mode */}
      <div className="absolute inset-0 bg-black/0 dark:bg-black/70 transition-colors duration-300 pointer-events-none" />
      <div className="inline-flex flex-col gap-4 mt-12">
        {latestHappenings && latestHappenings.length > 0 && (
          <div className="bg-white/80 dark:bg-white/5 p-4 pl-8 backdrop-blur-sm">
            {latestHappenings.map((happening) => (
              <div key={happening.sys.id}>
                {happening.fields.content && (
                  <div className="prose">
                    {renderRichText(happening.fields.content.content)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


