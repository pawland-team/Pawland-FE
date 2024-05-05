'use client';

import { useEffect, useRef, useState } from 'react';

import { DebounceSettings, ThrottleSettings } from 'lodash';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

interface UseInViewParam {
  IntersectionObserverInit?: IntersectionObserverInit;
  callback?: (isIntersecting: IntersectionObserverEntry['isIntersecting']) => void;
  /**
   * withThrottle이 있으면 debounce는 무시된다.
   */
  withThrottle?: { wait?: number; options?: ThrottleSettings };
  withDebounce?: { wait?: number; options?: DebounceSettings };
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
function useInView<T extends HTMLElement>(useInViewParam?: UseInViewParam): UseInViewReturn<T> {
  const [isIntersecting, setIntersecting] = useState(false);
  const intersectionObserveTargetRef = useRef<T>(null);
  useEffect(() => {
    const { IntersectionObserverInit, callback, withDebounce, withThrottle } = useInViewParam || {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIntersecting(entry.isIntersecting);

        if (typeof callback === 'function' && typeof withThrottle === 'object') {
          const { wait, options } = withThrottle;
          const throttledCallback = throttle(callback, wait, options);
          throttledCallback(entry.isIntersecting);

          return;
        }

        if (typeof callback === 'function' && typeof withDebounce === 'object') {
          const { wait, options } = withDebounce;
          const debouncedCallback = debounce(callback, wait, options);
          debouncedCallback(entry.isIntersecting);

          return;
        }

        if (typeof callback === 'function') {
          callback(entry.isIntersecting);
        }
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

export { useInView };
