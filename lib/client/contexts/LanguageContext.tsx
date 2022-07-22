import { createContext, useCallback, useContext, useState } from 'react';
import { Language } from '../../core/types';

const LanguageContext = createContext<{ language: Language; toggle: () => void }>({
  language: 'en-us',
  toggle: () => {},
});

const LanguageProvider = ({ children }: { children?: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en-us');

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en-us' ? 'es-ar' : 'en-us');
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggle: toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageConsumer = LanguageContext.Consumer;

export const useLanguageContext = () => useContext(LanguageContext);

export { LanguageProvider, LanguageConsumer };
