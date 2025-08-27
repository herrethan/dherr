export default function Paintings() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-light text-gray-900 dark:text-white mb-8">
          Paintings
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          A collection of contemporary paintings exploring color, form, and emotion.
        </p>
        
        {/* Placeholder for paintings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">Painting {item}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
