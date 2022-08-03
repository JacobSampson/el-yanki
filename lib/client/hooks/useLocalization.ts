import { useCallback } from 'react';
import { Language } from '../../core/types';
import { useLanguageContext } from '../contexts/LanguageContext';

export const ucc = (s: string) =>
  s
    .split(' ')
    .map((w: string) => `${w.slice(0, 1).toUpperCase()}${w.slice(1)}`)
    .join(' ');

export const plural = (s: string) => `${s}s`;

export const denominalize = (s: string) => s;

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
      locked: 'locked',
      close: 'close',
      post: 'post',
      about: 'about',
      update: 'update',
      comment: 'comment',
      signUp: 'sign up',
      view: 'view',
      ReportDisclaimer: `Research Report 2022
      University of Wisconsin
      River Falls, Wisconsin`,
    },
  ],
  [
    'es-ar',
    {
      home: 'página de inicio',
      [t('home', ucc)]: 'Página de Inicio',
      report: 'reportaje',
      locked: 'bloqueado',
      close: 'cerrar',
      post: 'publicar',
      about: 'información general',
      update: 'noticia',
      comment: 'comentario',
      [t('comment', ucc, denominalize)]: ucc('comentar'),
      signUp: 'inscribirse',
      view: 'ver',
      ReportDisclaimer: `Research Report 2022
      University of Wisconsin
      River Falls, Wisconsin`,
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
