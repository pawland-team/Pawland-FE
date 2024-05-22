import { useEffect } from 'react';

import { QueryStatus } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useChatStore } from '@entities/chat/model';
import { ChatRoomListResponse } from '@shared/apis/chat-api';

export const useSetRoomMapOnWebSocketConnect = ({
  data,
  status,
}: {
  data: ChatRoomListResponse | undefined;
  status: QueryStatus;
}) => {
  const { webSocketClient, connectWebSocket, setRoomMap } = useChatStore(
    useShallow(({ connectWebSocket, webSocketClient, setRoomMap }) => ({
      connectWebSocket,
      webSocketClient,
      setRoomMap,
    })),
  );

  useEffect(() => {
    if (!data || status !== 'success') {
      return;
    }

    connectWebSocket(({ webSocketClient }) => {
      data.forEach(({ roomId, opponentUser, orderId, productInfo }) => {
        webSocketClient.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
          setRoomMap({
            roomId,
            unParsedMessage,
            opponentUser,
            productInfo,
            orderId,
          });
        });
      });
    });

    // return () => {
    //   if (webSocketClient.active) {
    //     webSocketClient.deactivate();
    //   }
    // };
  }, [webSocketClient, data, status, setRoomMap, connectWebSocket]);
};
