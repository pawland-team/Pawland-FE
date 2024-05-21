import { useEffect } from 'react';

import { InfiniteData, QueryStatus } from '@tanstack/react-query';

import { ChatContent, HTTPChatResponse } from '@shared/apis/chat-api';

import { ChatStoreState, RoomState } from '../model';

export const useAppendPreviousMessageList = ({
  selectedChatRoomId,
  status,
  data,
  isPlaceholderData,
  chatRoomLocalRoomState,
  appendPreviousMessageList,
}: {
  selectedChatRoomId: ChatStoreState['selectedChatRoomId'];
  status: QueryStatus;
  data: InfiniteData<HTTPChatResponse, unknown> | undefined;
  isPlaceholderData: boolean;
  chatRoomLocalRoomState: RoomState | undefined;
  appendPreviousMessageList: ChatStoreState['appendPreviousMessageList'];
}) => {
  useEffect(() => {
    if (selectedChatRoomId === undefined) {
      return;
    }

    if (status === 'success' && data && data.pages.length > 0 && !isPlaceholderData) {
      const previousMessageList: ChatContent[] = data.pages.flatMap((page) => {
        return page.messageList.map<ChatContent>(({ sender, ...rest }) => ({
          sender: Number(sender),
          ...rest,
        }));
      });

      /**
       * 이전에 가져온 데이터의 nextCursor
       * @description useInfiniteQuery의 getNextPageParam이 원하는대로 동작하지 않아서
       * 같은 cursor로 가져온 데이터는 추가하지 않도록 임시방편으로 해결
       *
       */
      const previousCursor = chatRoomLocalRoomState?.nextCursor;
      /**
       * 현재 받아온 데이터에 담긴 nextCursor
       */
      const { nextCursor } = data.pages[data.pages.length - 1];

      // 이전에 가져온 데이터의 nextCursor와 현재 받아온 데이터의 nextCursor가 같다면 추가하지 않음
      // previousCursor의 초기값 null
      // But, 가져온 값이 있는데 nextCursor가 null일 수 있음. 이 때 previousCursor도 null이면 추가되지 않는 불상사가 생김
      // 그래서 messageList의 길이가 0일 때(초기)는 nextCursor가 같아도 추가해야 함. 그래서 아래와 같은 조건문 줌
      if (previousCursor === nextCursor && Number(chatRoomLocalRoomState?.messageList.length) > 0) {
        return;
      }

      if (previousMessageList.length === 0) {
        return;
      }

      appendPreviousMessageList({
        roomId: selectedChatRoomId,
        /**
         * previousMessageList: data.pages[data.pages.length - 1].messageList,
         * maxPages가 1임.
         * 그렇기 때문에 어차피 들고 있는 pages에 page가 단 한 개 밖에 없음.
         * 1페이지에는 최신 메시지가 있음.
         */
        previousMessageList,
        nextCursor,
      });
    }
  }, [
    status,
    data,
    selectedChatRoomId,
    isPlaceholderData,
    appendPreviousMessageList,
    chatRoomLocalRoomState?.nextCursor,
    chatRoomLocalRoomState?.messageList.length,
  ]);
};
