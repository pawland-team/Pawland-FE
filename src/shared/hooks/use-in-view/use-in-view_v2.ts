import { useEffect, useRef, useState } from 'react';

interface UseInViewParam {
  IntersectionObserverInit?: IntersectionObserverInit;
}

interface UseInViewReturn<T extends HTMLElement> {
  intersectionObserveTargetRef: React.RefObject<T>;
  isIntersecting: boolean;
}

/**
 * @example
 *
 * const { intersectionObserveTargetRef, isIntersecting } = useInView<HTMLDivElement>();
 */
function useInView_v2<T extends HTMLElement>(useInViewParam?: UseInViewParam): UseInViewReturn<T> {
  const [isIntersecting, setIntersecting] = useState(false);
  const intersectionObserveTargetRef = useRef<T>(null);
  useEffect(() => {
    const { IntersectionObserverInit } = useInViewParam || {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIntersecting(entry.isIntersecting);
      }
    }, IntersectionObserverInit);

    const intersectionObserveTargetRefCurrent = intersectionObserveTargetRef.current;

    if (intersectionObserveTargetRefCurrent) {
      observer.observe(intersectionObserveTargetRefCurrent);
    }

    return () => {
      // The ref value 'intersectionObserveTargetRef.current' will likely have changed by the time this effect cleanup function runs.
      // If this ref points to a node rendered by React, copy 'intersectionObserveTargetRef.current' to a variable inside the effect, and use that variable in the cleanup function.eslintreact-hooks/exhaustive-deps

      if (intersectionObserveTargetRefCurrent) {
        observer.disconnect();
      }
    };
  }, []);

  return { intersectionObserveTargetRef, isIntersecting };
}

export { useInView_v2 };
