export default function About() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-light text-gray-900 dark:text-white mb-8">
          About
        </h1>
        
        <div className="text-left space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I am a visual artist working primarily in painting and drawing. My work explores 
            the relationship between color, form, and emotion, creating visual narratives 
            that invite contemplation and connection.
          </p>
          
          <p>
            Born and raised in [City], I studied at [Art School] where I developed my 
            foundational skills and artistic voice. My practice is influenced by both 
            contemporary art movements and classical techniques.
          </p>
          
          <p>
            I have exhibited my work in galleries and museums across [Region], and my pieces 
            are held in private collections internationally. When I'm not in the studio, 
            you can find me exploring nature, reading, or collaborating with other artists.
          </p>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-light text-gray-900 dark:text-white mb-4">Education</h2>
            <p className="text-gray-600 dark:text-gray-400">[Art School], [Degree], [Year]</p>
            
            <h2 className="text-xl font-light text-gray-900 dark:text-white mb-4 mt-8">Exhibitions</h2>
            <p className="text-gray-600 dark:text-gray-400">[Gallery Name], [City], [Year]</p>
            <p className="text-gray-600 dark:text-gray-400">[Museum Name], [City], [Year]</p>
          </div>
        </div>
      </div>
    </main>
  );
}
