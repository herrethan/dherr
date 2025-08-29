import { notFound } from 'next/navigation';
import client from "@/lib/contentful";
import { ContentfulAsset, Work } from '@/types/contentful';
import Image from 'next/image';

interface WorkPageProps {
  params: {
    work: string;
  };
}

async function getWorkData(workType: string) {
  try {
    // Get all work entries and filter in JavaScript for case-insensitive matching
    const response = await client.getEntries({
      content_type: 'work',
    });
    
    // Filter for case-insensitive match
    const filteredWorks = response.items.filter(item => {
      const title = item.fields.title;
      return typeof title === 'string' && title.toLowerCase() === workType.toLowerCase();
    });
    
    return filteredWorks as Work[];
  } catch (error) {
    console.error('Error fetching work data:', error);
    return [];
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const workType = params.work;
  const works = await getWorkData(workType);
  
  // If no work found for this type, show 404
  if (works.length === 0) {
    notFound();
  }
  
  const work = works[0]; // Get the first matching work entry
  const title = work.fields.title || workType;

  
  
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        
        {/* Work items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {work.fields.items && work.fields.items.length > 0 ? (
            work.fields.items.map((item: ContentfulAsset, index: number) => (
              <div key={item.sys.id || index} className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
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
      </div>
    </main>
  );
}
