import { useState, useEffect } from "react";
import Modal from "./Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ NEW

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // ✅ Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Optional: auto close modal after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false); // reset for next open
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors px-4">

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-5 right-5 px-4 py-2 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Open Modal
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Contact Us
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We’d love to hear from you
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />

              <textarea
                placeholder="Message"
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />

              <button
                type="submit"
                className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          /* ✅ SUCCESS MESSAGE */
          <div className="text-center py-8">
            <div className="text-green-600 text-4xl mb-3">✔</div>
            <h3 className="text-xl font-semibold dark:text-white">
              Form submitted successfully!
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Thank you for contacting us.
            </p>
          </div>
        )}

      </Modal>
    </div>
  );
}

export default App;
