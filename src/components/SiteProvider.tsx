import client from '@/lib/contentful';
import { ContentfulProvider } from './ContentfulProvider';
import { HomePage, Work } from '@/types/contentful';

// Fetch all the content we need for the site
async function getSiteData() {
  try {
    const [homePageResponse, workResponse] = await Promise.all([
      client.getEntries({
        content_type: 'homePage',
      }),
      client.getEntries({
        content_type: 'work',
      }),
    ]);
    
    return {
      homePage: homePageResponse.items as HomePage[],
      work: workResponse.items as Work[],
    };
  } catch (error) {
    console.error('Error fetching site data from Contentful:', error);
    return {
      homePage: [],
      work: [],
    };
  }
}

export default async function SiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all site data from Contentful
  const siteData = await getSiteData();
  
  return (
    <ContentfulProvider siteData={siteData}>
      {children}
    </ContentfulProvider>
  );
}
