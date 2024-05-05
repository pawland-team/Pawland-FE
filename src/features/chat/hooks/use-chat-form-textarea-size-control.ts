import { MutableRefObject, useEffect, useState } from 'react';

import { useAutoResize } from '@shared/hooks/use-auto-resize';
import { useResizeObserver } from '@shared/hooks/use-resize-obserer';

import { chatTextAreaMinMaxSize } from '../constants/style';
import { ChangedTextAreaHeight } from '../model';

interface UseChatFormTextareaSizeControlReturn {
  handleResizeHeight: () => void;
  textAreaRef: MutableRefObject<HTMLElement | undefined>;
  changedTextAreaHeight: ChangedTextAreaHeight;
  observerTargetRef: MutableRefObject<HTMLElement | undefined>;
}

export const useChatFormTextareaSizeControl = <
  T extends HTMLElement = HTMLElement,
>(): UseChatFormTextareaSizeControlReturn => {
  const [changedTextAreaHeight, setChangedTextAreaHeight] = useState<ChangedTextAreaHeight>({
    initialHeight: chatTextAreaMinMaxSize.onDesktop.height,
    changedHeight: 0,
    currentHeight: chatTextAreaMinMaxSize.onDesktop.height,
  });

  const { handleResizeHeight, textBoxRef: textAreaRef } = useAutoResize<T>({
    minHeight: chatTextAreaMinMaxSize.onDesktop.minHeight,
    maxHeight: chatTextAreaMinMaxSize.onDesktop.maxHeight,
  });
  const { observerTargetRef, resizeInfo } = useResizeObserver<T>();

  // textarea 높이 변화를 감지한 후에 감싸고 있는 부모 태그들의 높이도 변해야 함.
  useEffect(() => {
    if (!resizeInfo) {
      return;
    }

    const { height: resizedHeight } = resizeInfo;
    const { initialHeight } = changedTextAreaHeight;

    setChangedTextAreaHeight((prev) => ({
      ...prev,
      changedHeight: resizedHeight - initialHeight,
      currentHeight: resizedHeight,
    }));
  }, [resizeInfo]);

  return { handleResizeHeight, textAreaRef, changedTextAreaHeight, observerTargetRef };
};
