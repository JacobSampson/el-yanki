import { Language } from './types';

const TIMESTAMP_FORMAT = 'yyyy-MM-DDTHH:mm:ss';

export const formatDate = (date: string, language: Language = 'en-us') => {
  return new Date(Date.parse(date as string)).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
