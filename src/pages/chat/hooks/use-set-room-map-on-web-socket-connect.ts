import { useEffect } from 'react';

import { QueryStatus } from '@tanstack/react-query';

import { ChatStoreState } from '@entities/chat/model';
import { ChatRoomListResponse } from '@shared/apis/chat-api';

export const useSetRoomMapOnWebSocketConnect = ({
  data,
  status,
  webSocketClient,
  setRoomMap,
}: {
  data: ChatRoomListResponse | undefined;
  status: QueryStatus;
  webSocketClient: ChatStoreState['webSocketClient'];
  setRoomMap: ChatStoreState['setRoomMap'];
}) => {
  useEffect(() => {
    if (!webSocketClient) {
      return;
    }

    if (!data || status !== 'success') {
      return;
    }

    webSocketClient.onConnect = () => {
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
    };

    if (!webSocketClient.active) {
      console.log('reactivated');
      webSocketClient.activate();
    }

    if (!webSocketClient.connected) {
      console.log('unconnected');

      return;
    }

    return () => {
      // unsubscribe
      if (webSocketClient.connected) {
        data.forEach(({ roomId }) => {
          webSocketClient.unsubscribe(`/topic/chatroom/${roomId}`);
        });
      }
    };
    // }, [webSocketClient, data, data?.length, status, setRoomMap]);
  }, [webSocketClient, data, status, setRoomMap]);
};
