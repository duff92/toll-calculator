import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PaletteMode } from '@mui/material';

interface ThemeContextProps {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the theme from localStorage, default to light mode
  const [mode, setMode] = useState<PaletteMode>(() => {
    const storedMode = localStorage.getItem('theme-mode');
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      return storedMode as PaletteMode;
    }

    // Check if user prefers dark mode via media query
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);

    // Update document attributes to help with styling
    document.documentElement.setAttribute('data-theme-mode', mode);

    // Additional class for easier CSS targeting
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, [mode]);

  // Function to toggle theme
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
