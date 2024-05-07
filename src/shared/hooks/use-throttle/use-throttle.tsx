import { useEffect, useRef } from 'react';

function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function throttledCallback(...args: Parameters<T>) {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        timeoutRef.current = null;
      }, delay);
    }
  }

  return throttledCallback;
}

export { useThrottle };
