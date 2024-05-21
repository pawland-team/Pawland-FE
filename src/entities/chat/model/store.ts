import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ChatContent, WebSocketChatResponse } from '@shared/apis/chat-api';

import { ChatStoreState, RoomState } from './models';

export const useChatStore = create<ChatStoreState>()(
  devtools(
    (set, get) => ({
      roomMap: new Map(),
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
      /**
       * 자기 roomId에 맞는 정보를 주입함
       * TODO: 프리뷰 메시지 받는 부분하고 메시지 받는 부분을 나눠야 함
       */
      setInitialRoomMap: (initialChatRoomList) => {
        // 변경사항: 기존 roomMap을 초기화하는 것이 아니라 기존 roomMap에 추가하는 방식으로 변경
        // 대신 새로운 roomId는 추가되고, 기존 roomId는 유지됨
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
      setWebSocketClient: (webSocketClient) => {
        if (get().webSocketClient) {
          // 스토어에 이미 있으면 return;

          return;
        }

        set(
          (prev) => ({
            ...prev,
            webSocketClient,
          }),
          false,
          { type: 'ChatStore/setWebSocketClient' },
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
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'ChatStore',
    },
  ),
);
