import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('proofolio_theme');
      const initial = saved === 'light' ? false : true;
      setIsDark(initial);
      updateTheme(initial);
    } catch {
      updateTheme(true);
    }
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-gray-100');
      document.body.classList.remove('bg-white', 'text-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-gray-900');
      document.body.classList.remove('bg-gray-900', 'text-gray-100');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
    try {
      localStorage.setItem('proofolio_theme', newTheme ? 'dark' : 'light');
    } catch (e) {
      // localStorage not available, ignore
      void e;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
