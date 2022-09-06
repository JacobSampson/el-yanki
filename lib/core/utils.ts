import { Language } from './types';

const TIMESTAMP_FORMAT = 'yyyy-MM-DDTHH:mm:ss';

export const formatDate = (date: string, language: Language = 'en-us') => {
  const dateLabel = new Date(Date.parse(date as string)).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (dateLabel === "Invalid Date") return date;

  return dateLabel;
};
