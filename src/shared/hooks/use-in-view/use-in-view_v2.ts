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
function useInView_v2<T extends HTMLElement>(useInViewParam?: UseInViewParam): UseInViewReturn<T> {
  const [isIntersecting, setIntersecting] = useState(false);
  const intersectionObserveTargetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIntersecting(entry.isIntersecting);
      }
    }, useInViewParam?.intersectionObserverInit);

    // const intersectionObserveTargetRefCurrent = intersectionObserveTargetRef.current;

    // if (intersectionObserveTargetRefCurrent) {
    //   observer.observe(intersectionObserveTargetRefCurrent);
    // }

    // return () => {
    //   // The ref value 'intersectionObserveTargetRef.current' will likely have changed by the time this effect cleanup function runs.
    //   // If this ref points to a node rendered by React, copy 'intersectionObserveTargetRef.current' to a variable inside the effect, and use that variable in the cleanup function.eslintreact-hooks/exhaustive-deps

    //   if (intersectionObserveTargetRefCurrent) {
    //     observer.disconnect();
    //   }
    // };

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

export { useInView_v2 };
