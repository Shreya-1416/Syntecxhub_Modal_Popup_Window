import { useState, useEffect } from "react";
import Modal from "./Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* -------------------------------
     Load theme from localStorage
  -------------------------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  /* -------------------------------
     Apply theme to <html>
  -------------------------------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* -------------------------------
     Scroll lock when modal opens
  -------------------------------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">

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
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Fill it
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We’d love to hear from you
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <textarea
            placeholder="Message"
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Send
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
