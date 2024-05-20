import { DependencyList, useEffect, useRef, useState } from 'react';

interface UseResizeObserverParam {
  /**
   * dependencyList 받아와서 observerTargetRef.current가 undefined일 때 resizeObserver.observe에 예상하지 못한 element가 들어가는 것을 방지
   */
  dependencyList?: DependencyList;
}

/**
 * observerTargetRef 지정하지 않으면 기본값 document.documentElement
 */
export const useResizeObserver = <T extends HTMLElement = HTMLElement>({
  dependencyList = [],
}: UseResizeObserverParam) => {
  const [resizeInfo, setResizeInfo] = useState<DOMRect | null>(null);
  const observerTargetRef = useRef<T>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry && entry.target.getBoundingClientRect) {
        setResizeInfo(entry.target.getBoundingClientRect());
      }
    });

    if (!observerTargetRef.current) {
      observerTargetRef.current = document.documentElement as T;
    }

    resizeObserver.observe(observerTargetRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);

  return { observerTargetRef, resizeInfo };
};
