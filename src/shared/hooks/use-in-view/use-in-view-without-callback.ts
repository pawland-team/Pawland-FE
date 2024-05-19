import { DependencyList, useEffect, useRef, useState } from 'react';

interface UseInViewParam {
  intersectionObserverInit?: IntersectionObserverInit;
  dependencyList?: DependencyList;
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
function useInViewWithoutCallback<T extends HTMLElement>(useInViewParam?: UseInViewParam): UseInViewReturn<T> {
  const [isIntersecting, setIntersecting] = useState(false);
  const intersectionObserveTargetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIntersecting(entry.isIntersecting);
      }
    }, useInViewParam?.intersectionObserverInit);

    if (intersectionObserveTargetRef.current) {
      observer.observe(intersectionObserveTargetRef.current);
    }

    return () => {
      if (intersectionObserveTargetRef.current) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, useInViewParam?.dependencyList || []);

  return { intersectionObserveTargetRef, isIntersecting };
}

export { useInViewWithoutCallback };
