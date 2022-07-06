import { createContext, useCallback, useContext, useState } from 'react';
import { Language } from '../../core/types';

const LanguageContext = createContext<{ language: Language; toggle: () => void }>({
  language: 'us-en',
  toggle: () => {},
});

const LanguageProvider = ({ children }: { children?: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('us-en');

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'us-en' ? 'ar-es' : 'us-en');
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
