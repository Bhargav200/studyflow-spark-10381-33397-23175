import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@/contexts/LenisContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { lenis } = useLenis();

  useEffect(() => {
    // Small delay to let exit animations complete
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, duration: 0.8 });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
