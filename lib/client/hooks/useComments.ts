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
      try {
        const response = await fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateId, language, body }),
        });

        const result = await response.json();

        console.log(result);
      } catch (e) {
        console.log('[err]', e);
      }

      Router.reload();
    },
    []
  );

  return {
    addComment,
  };
};

export default useComments;
