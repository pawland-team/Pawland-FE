import { MutableRefObject, useEffect } from 'react';

import { Client } from '@stomp/stompjs';

import { ChatStoreState } from '@entities/chat/model';

export const useSetWebSocket = ({
  stompRef,
  setWebSocketClient,
}: {
  stompRef: MutableRefObject<Client | undefined>;
  setWebSocketClient: ChatStoreState['setWebSocketClient'];
}) => {
  useEffect(() => {
    if (typeof WebSocket !== 'function') {
      console.error('WebSocket is not supported in this browser.');

      return;
    }

    stompRef.current = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WSS_URL,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 1000, // 재연결 딜레이 1초 (이 순간동안의 메시지는 유실된다. 기본값은 5초인듯. 참고로 0초는 유효하지 않은 값이다.)
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      beforeConnect: () => {
        console.log('beforeconnect');
      },
      onConnect: () => {
        console.log('OnConnect');
      },
    });

    try {
      // ?: 순서 상관 있을까?
      console.log(stompRef.current);

      setWebSocketClient(stompRef.current);
    } catch (error) {
      console.error(error);
    }
  }, [setWebSocketClient, stompRef]);
};
