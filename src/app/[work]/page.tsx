import { notFound } from 'next/navigation';
import client from "@/lib/contentful";
import { ContentfulAsset, Work } from '@/types/contentful';
import WorkGrid from '@/components/WorkGrid';

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
  const images = work.fields.items || [];

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <WorkGrid images={images} title={title} />
      </div>
    </main>
  );
}
