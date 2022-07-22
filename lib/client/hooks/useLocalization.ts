import { useCallback } from 'react';
import { Language } from '../../core/types';
import { useLanguageContext } from '../contexts/LanguageContext';

const LOCALIZED_STRINGS = [
  [
    'en-us',
    {
      // Uppercase
      Home: 'Home',
      Updates: 'Updates',
      // Lowercase
      report: 'report',
      reports: 'reports',
      update: 'update',
      updates: 'updates',
      view: 'view',
    },
  ],
  [
    'es-ar',
    {
      // Uppercase
      Home: 'Página de Inicio',
      Updates: 'Actualizaciones',
      // Lowercase
      report: 'reportaje',
      reports: 'reportajes',
      update: 'actualización',
      updates: 'actualizaciones',
      view: 'ver',
    },
  ],
] as const;

type LocalizationKey = keyof typeof LOCALIZED_STRINGS[number][1];

const LOCALIZED_STRINGS_MAP = new Map<Language, { [key in LocalizationKey]: string }>(
  LOCALIZED_STRINGS
);

const useLocalization = () => {
  const { language } = useLanguageContext();

  const mapper = useCallback(
    (key: LocalizationKey): string => {
      const localizer = LOCALIZED_STRINGS_MAP.get(language);

      if (!localizer || !(key in localizer)) return key as string;

      return localizer[key] as any as string;
    },
    [language]
  );

  return mapper;
};

export default useLocalization;
