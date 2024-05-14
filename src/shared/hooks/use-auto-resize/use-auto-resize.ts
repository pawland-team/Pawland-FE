import { useRef } from 'react';

interface UseAutoResizeParam {
  maxHeight?: number;
  minHeight?: number;
}

export const useAutoResize = <T extends HTMLElement = HTMLElement>({
  maxHeight,
  minHeight,
}: UseAutoResizeParam = {}) => {
  const BoxRef = useRef<T>();

  const handleResizeHeight = () => {
    if (!BoxRef.current) {
      return;
    }

    BoxRef.current.style.height = 'auto';

    if (maxHeight !== undefined && BoxRef.current.scrollHeight > maxHeight) {
      BoxRef.current.style.height = `${maxHeight}px`;

      return;
    }

    if (minHeight !== undefined && BoxRef.current.scrollHeight < minHeight) {
      BoxRef.current.style.height = `${minHeight}px`;

      return;
    }

    BoxRef.current.style.height = `${BoxRef.current.scrollHeight}px`;
  };

  // TODO: 옵션에 따라 height 조절 방식도 추가하기

  return { BoxRef, handleResizeHeight };
};
