'use client';

export default function Contact() {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries()) as Record<string, string>;
    const asdf = await fetch("/__form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formDataObj).toString(),
    });
    console.log(asdf);
    // Success and error handling ...
  };
  return (
    <form 
      name="contact"
      className="max-w-md mx-auto"
      onSubmit={handleFormSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
      </p>
      
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white"
        />
      </div>
      
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white"
        />
      </div>
      
      <div className="mb-6">
        <textarea
          name="message"
          placeholder="Message"
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white resize-none"
        />
      </div>
      
      <button
        type="submit"
        className="w-full px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-100"
      >
        Send Message
      </button>
    </form>
  );
}
