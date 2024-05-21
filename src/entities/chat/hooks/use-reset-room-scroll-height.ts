import { RefObject, useEffect, useRef } from 'react';

import { ChatStoreState } from '../model';

export const useResetRoomScrollHeight = ({
  selectedChatRoomId,
}: {
  selectedChatRoomId: ChatStoreState['selectedChatRoomId'];
}): { currentRoomBodyRef: RefObject<HTMLDivElement> } => {
  /**
   * 방 바뀌면 scrollHeight 초기화
   */
  const currentRoomBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    currentRoomBodyRef.current?.scrollTo({
      top: currentRoomBodyRef.current.scrollHeight,
      behavior: 'instant',
    });
  }, [selectedChatRoomId]);

  return {
    currentRoomBodyRef,
  };
};
