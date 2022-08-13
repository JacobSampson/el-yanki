import { useCallback, useState } from 'react';
import Router from 'next/router';
import { Language } from '../../core/types';

const useComments = () => {
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const response = await fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateId, language, body }),
        });
        setLoading(false);

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
    loading,
    addComment,
  };
};

export default useComments;
