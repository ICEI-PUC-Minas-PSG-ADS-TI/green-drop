import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import PropTypes from 'prop-types';

export const ThemeContext = createContext(
  {
  colorScheme: "light",
  toggleTheme: () => {},
}
);

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(systemColorScheme);
  if (__DEV__) {
    console.log("Theme is:", colorScheme);
  }

  useEffect(() => {
    setColorScheme(systemColorScheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setColorScheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);