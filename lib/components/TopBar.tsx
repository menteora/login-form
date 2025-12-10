
import React, { useState } from 'react';
import { Menu, X, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

export interface MenuItem {
  label: string;
  action: () => void;
}

interface TopBarProps {
  title: string;
  isAuthenticated: boolean;
  user: User | null;
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  menuItems?: MenuItem[];
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  isAuthenticated,
  user,
  currentTheme,
  onToggleTheme,
  onLogout,
  menuItems = []
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <nav className="flex items-center space-x-4 mr-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isAuthenticated && user && (
              <div className="flex items-center pl-4 border-l border-gray-200 dark:border-gray-700 ml-4 space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                   <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                      <UserIcon size={16} className="text-blue-600 dark:text-blue-300"/>
                   </div>
                   <span className="font-medium text-gray-700 dark:text-gray-200">{user.username}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Esci</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
             <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
              {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            {isAuthenticated && (
                <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                 <div className="px-3 py-2 flex items-center space-x-2">
                    <UserIcon size={16} className="text-gray-500 dark:text-gray-400"/>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Loggato come {user?.username}</span>
                 </div>
                 <button
                    onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                  >
                    <LogOut size={18} />
                    <span>Esci</span>
                  </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
