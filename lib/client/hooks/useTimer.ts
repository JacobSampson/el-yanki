import { useEffect, useState } from 'react';

const useTimer = (rate: number = 10, random: number = 0) => {
  const [t, setT] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setT(t => {
        if (t === Number.MAX_SAFE_INTEGER) {
          return 0;
        }
        return t + 1;
      });
    }, rate);
  }, [rate, t]);

  return t;
};

export default useTimer;
