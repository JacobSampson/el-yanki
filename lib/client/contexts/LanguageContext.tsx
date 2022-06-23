import { createContext, useContext } from 'react';
import { Language } from '../../core/types';

const LanguageContext = createContext<Language>('en');

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;

export const useLanguageContext = () => useContext(LanguageContext);
