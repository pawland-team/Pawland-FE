import { Client } from '@stomp/stompjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ChatContent, WebSocketChatResponse } from '@shared/apis/chat-api';

import { ChatStoreState, RoomState } from './models';

/**
 * TODO: chatting은 자주 바뀔 수 있는 데이터이므로 zustand의 transient update를 사용하는 것이 좋을 것 같다.
 */
export const useChatStore = create<ChatStoreState>()(
  devtools(
    (set, get) => ({
      setWebSocketClient: () => {
        if (typeof WebSocket !== 'function') {
          console.error('WebSocket is not supported in this browser.');

          return;
        }

        if (get().webSocketClient) {
          return;
        }

        const newWebSocketClient = new Client({
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
          // onConnect: () => {
          //   console.log('OnConnect'); // 확인해보니 property 할당 방식인 onConnect가 이 Constructor에서 미리 설정하는 이 부분을 전부 덮어씌운다.
          // },
        });

        try {
          set((prev) => ({
            ...prev,
            webSocketClient: newWebSocketClient,
          }));
        } catch (error) {
          console.error(error);
        }
      },
      connectWebSocket: (onConnect) => {
        const { webSocketClient } = get();

        if (!webSocketClient) {
          throw new Error('WebSocketClient is not initialized.');
        }
        // 이미 연결되어 있으면 그대로 반환

        if (webSocketClient.connected || webSocketClient.active) {
          return webSocketClient;
        }

        webSocketClient.onConnect = (frame) => onConnect({ frame, webSocketClient });
        webSocketClient.activate();

        return webSocketClient;
      },
      /**
       * default empty roomMap
       */
      roomMap: new Map(),
      /**
       * # 상시 연결이느냐 아니느냐에 따라 구현 방법이 달라질 수 있음 - 현재 채택한 방식은 상시 연결
       * * 방법 1: 상시 연결
       * - 상시 연결이면 현재 방식대로 하면 됨
       * - 유저 수가 별로 없기 때문에 채택한 방식은 상시 연결
       * - 장점: unmount돼도 disconnect되지 않기 때문에 유실될 메시지가 없다. 그래서 diconnect 된 동안의 메시지를 조회할 api를 만들 필요도, 호출할 필요도 없다.
       * - 단점: 상시 연결이기 때문에 연결 수가 많아질수록 서버에 부담이 될 수 있음
       * * 방법 2: unmount 될 때 disconnect(deactivate)하는 방식
       * - 만약 unmount 될 때 disconnect(deactivate)하는 방식일 경우, 이전에 받은 메시지를 어떻게 처리할 것인가?
       *    * 방법 2-1: 이전에 받은 메시지를 모두 버림
       *    - 연결이 끊겨진 동안 유실될 메시지가 분명히 있을 수 있기 때문에 이전에 들고 있던 messageList도 전부 비어준다.
       *    - 새 연결 시 무한 스크롤로 이전 메시지를 다시 불러오는 방식으로 구현한다.
       *    * 방법 2-2: 이전에 받은 메시지를 모두 유지함
       *    - 이렇게 할 경우 disconnect된 동안에 온 메시지들을 조회할 필요가 있음 -> 이런 api가 필요함
       *    - 조회해서 가져온 메시지들을 이전 messageList의 앞쪽에 끼워 넣어야 한다.
       *
       * - 참고로 connect됐을 때 subscribe하는 방식은 onConnect에서 하든 useEffect 의존성 배열값에 webSocketClient.connected를 넣어서 connected 상태 확인해서 조건문에서 하든
       *  webSocketClient가 자동으로 수시로 disconnect, reconnect를 하면서 onConnect를 다시 발동시키고 connected 상태 변경을 반복하기 때문에 결국에는 똑같다.
       *  webSocketClient 자체적으로 reconnect loop를 가지고 있다고 한다.
       * * reconnect loop를 끝내고 완전히 disconnect를 하고 싶다면, webSocketClient.deactivate()를 사용하면 된다.
       */
      setInitialRoomMap: (initialChatRoomList) => {
        // 기존 roomId에 대한 정보가 없으면 추가하고, 있으면 유지함
        // 기존 roomMap을 가져옴
        const prevRoomMap = get().roomMap;

        // 새로운 roomMap을 만들기 위한 Map 생성
        const newRoomMap = new Map<RoomState['roomId'], RoomState>();

        initialChatRoomList.forEach((roomInfo) => {
          const { roomId, opponentUser, productInfo, lastMessage, orderId } = roomInfo;

          // initialChatRoomList에서 기존 roomMap에 없는 roomId에 대한 정보를 추가함
          if (!prevRoomMap.has(roomId)) {
            newRoomMap.set(roomId, {
              roomId,
              opponentUser,
              productInfo,
              orderId,
              messageList: [],
              previewMessage: lastMessage ?? null,
              nextCursor: null,
            });

            return;
          }

          // 기존 roomMap에 있는 roomId에 대한 정보를 유지함
          // 기존 roomState에서 messageList는 유지하고, previewMessage를 포함한 나머지 필드는 initialChatRoomList에서 가져옴
          const prevRoomState = prevRoomMap.get(roomId);

          newRoomMap.set(roomId, {
            roomId,
            opponentUser,
            productInfo,
            orderId,
            messageList: prevRoomState?.messageList ?? [],
            previewMessage: lastMessage ?? null,
            nextCursor: prevRoomState?.nextCursor ?? null,
          });
        });

        set(
          (prev) => ({
            ...prev,
            webSocketClient: prev.webSocketClient,
            roomMap: newRoomMap,
          }),
          false,
          { type: 'ChatStore/SetInitialRoomMap' },
        );
      },
      setRoomMap: ({ roomId, opponentUser, productInfo, unParsedMessage, orderId }) => {
        try {
          if (unParsedMessage) {
            // # (Given) websocket 응답 시
            const { body } = unParsedMessage;
            const data = JSON.parse(body) as WebSocketChatResponse;

            if (!data) {
              console.error('data is undefined');

              return;
            }

            if (!data.message) {
              console.error('message is empty.');

              return;
            }

            const { sender, ...rest } = data;

            const latestChat: ChatContent = { sender: Number(sender), ...rest };

            set(
              (prev) => ({
                ...prev,
                webSocketClient: prev.webSocketClient,
                roomMap: new Map(prev.roomMap).set(roomId, {
                  roomId,
                  opponentUser,
                  productInfo,
                  orderId,
                  // * (Then) 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가
                  // 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가(column-reverse 방식으로 구현하기 위함)
                  // 0 번째 인덱스를 맨 밑으로 보내기 위함
                  messageList: [latestChat, ...(prev.roomMap.get(roomId)?.messageList ?? [])],
                  previewMessage: latestChat,
                  // 이전 값 조회하기 위한 nextCursor라서 args로 받는 게 아니라 여기서는 get으로 가져옴
                  nextCursor: prev.roomMap.get(roomId)?.nextCursor ?? null,
                }),
              }),
              false,
              { type: 'ChatStore/SetRoomMap' },
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
      appendPreviousMessageList: ({ previousMessageList, roomId, nextCursor }) => {
        const roomStateFromGet = get().roomMap.get(roomId);

        if (!roomStateFromGet) {
          return;
        }

        set(
          (prev) => {
            const p = prev.roomMap.get(roomId) ?? roomStateFromGet;

            return {
              ...prev,
              webSocketClient: prev.webSocketClient,
              roomMap: new Map(prev.roomMap).set(roomId, {
                ...p,
                previewMessage: p.previewMessage ? p.previewMessage : previousMessageList[0],
                roomId: p.roomId,
                messageList: [...(prev.roomMap.get(roomId)?.messageList ?? []), ...previousMessageList],
                nextCursor,
              }),
            };
          },
          false,
          { type: 'ChatStore/AppendPreviousMessageList' },
        );
      },
      sendChatMessage: ({ chatRequestBody }) => {
        const { webSocketClient, selectedChatRoomId } = get();

        if (!webSocketClient) {
          throw new Error('WebSocketClient is not initialized.');
        }

        if (selectedChatRoomId === undefined) {
          throw new Error('chatRoom is not selected. SelectedChatRoomId is undefined.');
        }

        try {
          webSocketClient.publish({
            destination: `/app/chat.sendMessage/${selectedChatRoomId}`,
            body: JSON.stringify(chatRequestBody),
          });
        } catch (error) {
          console.error(error);
        }
      },
      setSelectedChatRoomId: (roomId) => {
        set(
          (prev) => ({
            ...prev,
            webSocketClient: prev.webSocketClient,
            selectedChatRoomId: roomId,
          }),
          false,
          { type: 'ChatStore/SelectRoom' },
        );
      },
      destroyRoomList: () => {
        set(
          (prev) => ({
            ...prev,
            webSocketClient: prev.webSocketClient,
            roomMap: new Map(),
          }),
          false,
          { type: 'ChatStore/DestroyRoomList' },
        );
      },
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'ChatStore',
    },
  ),
);
