import { useCallback, useEffect } from 'react';

import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { throttle } from 'lodash';

import { HTTPChatResponse } from '@shared/apis/chat-api';

export const useThrottledFetchNextPage = ({
  hasNextPage,
  isIntersecting,
  isPlaceholderData,
  isFetchingNextPage,
  isFetching,
  selectedChatRoomId,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isIntersecting: boolean;
  isPlaceholderData: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  selectedChatRoomId: number | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<HTTPChatResponse, unknown>, Error>>;
}) => {
  const throttledFetchNextPage = useCallback(
    throttle(() => {
      fetchNextPage({ throwOnError: true }).catch((error) => {
        console.error(error);
      });
    }, 2000),
    [fetchNextPage, selectedChatRoomId],
  );

  useEffect(() => {
    if (hasNextPage && isIntersecting && isPlaceholderData === false && !isFetchingNextPage && !isFetching) {
      throttledFetchNextPage();
    }
  }, [
    throttledFetchNextPage,
    isFetchingNextPage,
    isIntersecting,
    hasNextPage,
    isFetching,
    isPlaceholderData,
    selectedChatRoomId,
  ]);
};
