// components/FixedDarkModeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

export default function FixedDarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "true";
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleDarkMode}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          group relative
          flex items-center justify-center
          w-14 h-14
          rounded-2xl
          gradient-bg
          shadow-2xl
          hover:shadow-3xl
          transition-all duration-300
          hover:scale-110
          overflow-hidden
          border-2 border-white/20
        `}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Animated sparkle effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icons with animation */}
        <div className="relative flex items-center justify-center">
          {darkMode ? (
            <>
              <Sun className="w-6 h-6 text-amber-300 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-ping" />
            </>
          ) : (
            <>
              <Moon className="w-6 h-6 text-blue-100 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-blue-300 animate-ping" />
            </>
          )}
        </div>

        {/* Tooltip on hover */}
        <div className={`
          absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full
          px-3 py-2
          bg-gray-900 dark:bg-gray-800
          text-white text-sm font-medium
          rounded-lg
          whitespace-nowrap
          shadow-xl
          transition-all duration-200
          ${isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'}
          pointer-events-none
        `}>
          {darkMode ? 'Switch to Light' : 'Switch to Dark'}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
        </div>
      </button>
    </div>
  );
}
