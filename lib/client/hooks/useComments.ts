import { useCallback } from 'react';
import Router from 'next/router';
import { Language } from '../../core/types';

const useComments = () => {
  const addComment = useCallback(
    async ({
      updateId,
      language,
      body,
    }: {
      updateId: string;
      language: Language;
      body: string;
    }) => {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateId, language, body }),
      });

      const result = await response.json();
      console.log('result'), result;

      Router.reload();
    },
    []
  );

  return {
    addComment,
  };
};

export default useComments;
