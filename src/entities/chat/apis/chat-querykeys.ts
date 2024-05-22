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
      // staleTime: 1000 * 60 * 10,
      staleTime: Infinity, // refetchOnMount: 'always'옵션 전역에 켜져 있어서 굳이 staleTime을 설정할 필요가 없음.
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
      string | null
    >({
      // enabled option 덕분에 roomId가 undefined일 때는 쿼리가 실행되지 않음.
      // ! 문제점: 쿼리는 생성됨 (["chat","chatRoomList","previousChatList",null])
      queryKey: chatQueryKeys.previousChatList(roomId!),
      queryFn: ({ pageParam, signal }) => getPreviousChatList({ cursorId: pageParam, roomId: roomId!, signal }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        const { nextCursor } = lastPage;

        return nextCursor;
      },
      /**
       * * 현재 메시지 리스트는 소켓으로 하나씩 채워지는 실시간 채팅 + Query로 조회해온 이전 채팅 리스트로 구성되어 있음.
       * 이런 상황에서는 어디서부터가 query가 관리하는 데이터인지 알 수가 없는 상황임.
       * 그렇기 때문에 invalidateQueries 호출하여 refetch하는 방식은 채택하지 않을 것임.
       * * 만약 소켓으로 하나씩 가져오는 실시간 채팅과 Query로 조회해오는 이전 채팅 리스트를 분리해서 (채팅)리스트를 관리한다면 invalidateQueries 호출하는 방식을 채택할 수 있을 것임.
       * 그렇게 한다면 Query로 조회해온 이전 채팅 리스트만 무효화시킬 수 있기 때문임.
       * 단, 이런 경우에는 소켓으로 가져온 채팅은 무효화하지 못한다는 문제점이 있음.
       * * 가장 좋은 방식을 생각해본 결과
       * 위 방식보다는 소켓으로 DELETE 타입과 삭제할 메시지 ID를 받아서 메시지 리스트에서 해당하는 메시지를 삭제하는 방식을 채택하는 것이 나아보임.
       * 이렇게 한다면 내가 DELETE요청을 보낼 때도 소켓 프로토콜로 DELETE 타입과 삭제할 메시지 ID를 보내면 됨.
       * * 삭제했을 때 invalidateQueries를 하지 않고 소켓으로 응답을 받을 것이기 때문에 무효화할 필요가 없음.
       * 그래서 staleTime을 Infinity로 설정하여 무효화되지 않도록 설정함.
       */
      staleTime: Infinity,
      // 1시간
      gcTime: 1000 * 60 * 60,
      enabled: roomId !== undefined,
      placeholderData: keepPreviousData,
      maxPages: 1, // 소켓으로 가져온 채팅 1개 + 스크롤로 가져온 채팅 리스트 10개(1페이지)...에 매번 1페이지씩만 새로 가져와서 추가하는 방식으로 구현
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }),
};
