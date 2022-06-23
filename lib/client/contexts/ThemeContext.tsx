import { useState, createContext, useCallback, useContext } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { darkTheme, lightTheme, Theme } from '../../../styles/themes';

const ThemeContext = createContext<{ theme: Theme; setValue: () => void }>({
  theme: lightTheme,
  setValue: () => {},
});

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = useCallback(() => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setValue: toggleTheme }}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

const ThemeConsumer = ThemeContext.Consumer;

export const useThemeContext = () => useContext(ThemeContext);

export { ThemeProvider, ThemeConsumer };
