import { useRef } from 'react';

interface UseAutoResizeParam {
  maxHeight?: number;
  minHeight?: number;
}

export const useAutoResize = <T extends HTMLElement = HTMLElement>({
  maxHeight,
  minHeight,
}: UseAutoResizeParam = {}) => {
  const textBoxRef = useRef<T>();

  const handleResizeHeight = () => {
    if (!textBoxRef.current) {
      return;
    }

    textBoxRef.current.style.height = 'auto';

    if (maxHeight && textBoxRef.current.scrollHeight > maxHeight) {
      textBoxRef.current.style.height = `${maxHeight}px`;

      return;
    }

    if (minHeight && textBoxRef.current.scrollHeight < minHeight) {
      textBoxRef.current.style.height = `${minHeight}px`;

      return;
    }

    textBoxRef.current.style.height = `${textBoxRef.current.scrollHeight}px`;
  };

  // TODO: 옵션에 따라 height 조절 방식도 추가하기

  return { textBoxRef, handleResizeHeight };
};
