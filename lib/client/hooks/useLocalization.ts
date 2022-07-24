import { useCallback } from 'react';
import { Language } from '../../core/types';
import { useLanguageContext } from '../contexts/LanguageContext';

export const ucc = (s: string) =>
  s
    .split(' ')
    .map((w: string) => `${w.slice(0, 1).toUpperCase()}${w.slice(1)}`)
    .join(' ');

export const plural = (s: string) => `${s}s`;

/**
 * Library functions
 */

const sortTransforms = (transforms: ((v: string) => string)[]): ((v: string) => string)[] =>
  transforms.sort((t1, t2) => t1.name.localeCompare(t2.name));

const applyTransforrms = (value: string, transforms: ((v: string) => string)[]): string =>
  sortTransforms(transforms).reduce((curr, transform) => transform(curr), value);

const t = (value: string, ...transforms: ((v: string) => string)[]) => {
  const transformKey = sortTransforms(transforms).reduce((acc, curr) => acc + ':' + curr, '');
  return Symbol.for(`${transformKey}-${value}`);
};

const LOCALIZED_STRINGS = [
  [
    'en-us',
    {
      home: 'home',
      report: 'report',
      update: 'update',
      view: 'view',
    },
  ],
  [
    'es-ar',
    {
      home: 'página de inicio',
      [t('home', ucc)]: 'Página de Inicio',
      report: 'reportaje',
      update: 'noticia',
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
    (key: LocalizationKey, ...transforms: ((v: string) => string)[]): string => {
      const localizer = LOCALIZED_STRINGS_MAP.get(language);

      if (!localizer || !(key in localizer)) return applyTransforrms(key as string, transforms);

      return (
        (localizer[t(key as string, ...transforms) as unknown as LocalizationKey] as string) ||
        applyTransforrms(localizer[key] as any as string, transforms)
      );
    },
    [language]
  );

  return mapper;
};

export default useLocalization;
