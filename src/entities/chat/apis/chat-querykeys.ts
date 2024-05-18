import { InfiniteData, infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getChatRoomList, getPreviousChatList, HTTPChatResponse } from '@shared/apis/chat-api';

export const chatQueryKeys = {
  all: () => ['chat'],
  chatRoomList: () => [...chatQueryKeys.all(), 'chatRoomList'],
  // chatRoomList가 무효화되면 chatRoom을 새로 불러오는 것이므로
  // chatRoom에 담겨있는 채팅 리스트를 불러오는 previousChatList도 무효화되어야 한다.
  previousChatList: (roomId: number) => [...chatQueryKeys.chatRoomList(), 'previousChatList', roomId],
};

export const chatQuery = {
  all: () =>
    queryOptions({
      queryKey: chatQueryKeys.all(),
    }),

  chatRoomList: () =>
    queryOptions({
      queryKey: chatQueryKeys.chatRoomList(),
      // 방 불러오는 비동기 함수 자체는 소켓으로 불러오는 것이 아니라
      // http 요청으로 불러옴. -> 방 리스트 목록 자체는 실시간 데이터가 아님
      queryFn: getChatRoomList,
      // 10분 동안 유효한 데이터로 간주
      staleTime: 1000 * 60 * 10,
      // 1시간
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: 0,
    }),

  previousChatList: ({ roomId }: { roomId?: number }) =>
    infiniteQueryOptions<
      HTTPChatResponse,
      Error,
      InfiniteData<HTTPChatResponse>,
      Readonly<ReturnType<typeof chatQueryKeys.previousChatList>>,
      string | undefined
    >({
      // enabled option 덕분에 roomId가 undefined일 때는 쿼리가 실행되지 않음.
      // ! 문제점: 쿼리는 생성됨 (["chat","chatRoomList","previousChatList",null])
      queryKey: chatQueryKeys.previousChatList(roomId!),
      queryFn: ({ pageParam }) => getPreviousChatList({ cursorId: pageParam, roomId: roomId! }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        const { nextCursor } = lastPage;
        console.log(nextCursor);

        if (nextCursor) {
          return nextCursor;
        }

        // * check
        return undefined;
      },
      // 메시지를 삭제하지 않는 이상 무효화할 필요가 없음.
      staleTime: Infinity,
      // 1시간
      gcTime: 1000 * 60 * 60,
      enabled: roomId !== undefined,
      placeholderData: keepPreviousData,
      maxPages: 1, // 소켓으로 가져온 채팅 1개 + 스크롤로 가져온 채팅 리스트 10개(1페이지)...에 매번 1페이지씩만 새로 가져와서 추가하는 방식으로 구현
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }),
};
