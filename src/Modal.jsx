import { useEffect, useState } from "react";

function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);

  // Handle mount/unmount animation
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      // Delay unmount for exit animation
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!show) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-200
        ${isOpen ? "opacity-100" : "opacity-0"}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative bg-white dark:bg-gray-900
          rounded-xl shadow-xl
          w-[90%] sm:w-[420px]
          max-h-[90vh] overflow-y-auto
          p-5 sm:p-6
          transform transition-all duration-200
          ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-xl"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
