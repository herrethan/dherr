import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-2xl sm:text-4xl font-light text-gray-900 dark:text-white mb-8">
          Contact
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12">
          Get in touch to discuss commissions, collaborations, or just to say hello.
        </p>
        
        <Contact />
      </div>
    </main>
  );
}
