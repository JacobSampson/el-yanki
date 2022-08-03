const TIMESTAMP_FORMAT = 'yyyy-MM-DDTHH:mm:ss';

export const formatDate = (date: string) => {
  return new Date(Date.parse(date as string)).toDateString();
};
