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
        {/* <Image src="/DHerr_About.jpg" alt="Daniel Herr" width={1000} height={1000} /> */}
        
        <div className="text-left mt-12 mb-12 space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {aboutPage?.fields?.content && (
            <div className="prose">
              {renderRichText(aboutPage.fields.content.content)}
            </div>
          )}
          {/* <p>
          Daniel Herr was born in California. The son of a landscape painter, Herr received his BA at UC Davis, and his MFA in painting from Boston University. He is a self-described “old-school painter,” with influence from abstract expressionism and the DADA movement. 
          </p>
          
          <p>
          Herr speaks of painting as a record of experience, likening it to a short story, poem or photograph; something which is personal but exists within the conventions of form. After living in New York for many years, Herr recently moved to Los Angeles. His work has been shown at SHFAP; the Java Project, Brooklyn, NYC; Shrine, NYC; Greenhouse, Alva, OK; LAST Projects, Los Angeles, CA among others.
          </p>
          
          <div className="mt-12 pt-8 pb-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-light text-gray-900 dark:text-white mb-4">Education</h2>
            <p className="text-gray-600 dark:text-gray-400">M.F.A. Boston University</p>
            <p className="text-gray-600 dark:text-gray-400">B.A. University of California, Davis</p>
          
            
            <h2 className="text-xl font-light text-gray-900 dark:text-white mb-4 mt-8">Recent Exhibitions</h2>
            <p className="text-gray-600 dark:text-gray-400">What’s My Thesis? Frank M. Doyle Arts Pavilion, Costa Mesa, CA, 2025</p>
            <p className="text-gray-600 dark:text-gray-400">L.A. Artist Relief LAST Projects, Los Angeles, 2025</p>
            <p className="text-gray-600 dark:text-gray-400"> Time and a Half, Shallow Bath, Los Angeles, 2024</p>
            <p className="text-gray-600 dark:text-gray-400">Meridians Zahav, Cali, Colombia, 2024</p>
            <p className="text-gray-600 dark:text-gray-400">Conduit Steven Harvey Fine Art Projects, New York, 2021</p>

            <a href="/DHerr_CV.pdf" target="_blank" className="text-gray-500 mt-8 text-xl dark:text-gray-400 flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="size-6">
                 <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.75v1h1.62V5zm-.75 3h6.62v1H4.5zm.75 3h-.75v1h6.62V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
               </svg>
              CV
            </a>
          </div> */}
        </div>
      </div>
    </main>
  );
}
