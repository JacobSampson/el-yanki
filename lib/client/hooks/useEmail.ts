import { useCallback, useState } from 'react';
import Router from 'next/router';

const useEmail = () => {
  const [loading, setLoading] = useState(false);

  const subscribeEmail = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      setLoading(false);

      const result = await response.json();

      console.log(result);
    } catch (e) {
      console.log('[err]', e);
    }
  }, []);

  return {
    loading,
    subscribeEmail,
  };
};

export default useEmail;
