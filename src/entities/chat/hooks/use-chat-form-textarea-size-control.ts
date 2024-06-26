import { DependencyList, MutableRefObject, useEffect, useState } from 'react';

import { useAutoResize } from '@shared/hooks/use-auto-resize';
import { useResizeObserver } from '@shared/hooks/use-resize-obserer';
import { ResponsiveNumericSizeProperties } from '@shared/interface/style';

import { ChangedTextAreaHeight } from '../model';

export interface UseChatFormTextareaSizeControlReturn {
  handleResizeHeight: () => void;
  textAreaRef: MutableRefObject<HTMLElement | undefined>;
  changedTextAreaHeight: ChangedTextAreaHeight;
  observerTargetRef: MutableRefObject<HTMLElement | undefined>;
}

interface UseChatFormTextareaSizeControlParam {
  dependencyListForObserver?: DependencyList;
  /**
   * TODO: 반응형 확장하기
   */
  sizes: ResponsiveNumericSizeProperties<{
    onDesktop: {
      height: number;
      minHeight: number;
      maxHeight: number;
    };
  }>;
}

export const useChatFormTextareaSizeControl = <T extends HTMLElement = HTMLElement>({
  dependencyListForObserver = [],
  sizes: {
    onDesktop: { height, maxHeight, minHeight },
  },
}: UseChatFormTextareaSizeControlParam): UseChatFormTextareaSizeControlReturn => {
  const [changedTextAreaHeight, setChangedTextAreaHeight] = useState<ChangedTextAreaHeight>({
    initialHeight: height,
    changedHeight: 0,
    currentHeight: height,
  });

  const { handleResizeHeight, BoxRef } = useAutoResize<T>({
    minHeight,
    maxHeight,
  });
  const { observerTargetRef, resizeInfo } = useResizeObserver<T>({ dependencyList: dependencyListForObserver });

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

  return { handleResizeHeight, textAreaRef: BoxRef, changedTextAreaHeight, observerTargetRef };
};
