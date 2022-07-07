import { useRef, useState, useEffect } from 'react';

const useRelativeY = () => {
  const ref = useRef<HTMLElement>();
  const [y, setY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  function updatePosition() {
    if (!ref.current) return;

    const offsetTop = ref.current.offsetTop - window.pageYOffset;
    const offset = Math.round(((window.innerHeight - offsetTop) * 100) / ref.current.clientHeight);

    setViewportHeight(ref.current.clientHeight);
    setY(offset);
  }

  useEffect(() => {
    setTimeout(updatePosition, 50);
  }, []);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', updatePosition);
    }
    watchScroll();
    // Remove listener (like componentWillUnmount)
    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  });

  return {
    ref,
    y,
    viewportHeight,
  };
};

export default useRelativeY;
