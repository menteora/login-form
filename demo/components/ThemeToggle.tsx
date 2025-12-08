
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 dark:focus:ring-offset-bkg-dark transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-6 w-6 text-gray-800" /> : <Sun className="h-6 w-6 text-yellow-500" />}
    </button>
  );
};

export default ThemeToggle;
