import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { ChatContent, WebSocketChatResponse } from '@shared/apis/chat-api';

import { ChatStoreState } from './models';

export const useChatStore = createWithEqualityFn<ChatStoreState>()(
  devtools(
    (set, get) => ({
      roomMap: new Map(),
      /**
       * 자기 roomId에 맞는 정보를 주입함
       */
      setRoomMap: ({ roomId, opponentUser, productInfo, unParsedMessage, previewMessage }) => {
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
                roomMap: new Map(prev.roomMap).set(roomId, {
                  roomId,
                  opponentUser,
                  productInfo,
                  // * (Then) 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가
                  // 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가(column-reverse 방식으로 구현하기 위함)
                  // 0 번째 인덱스를 맨 밑으로 보내기 위함
                  messageList: [latestChat, ...(prev.roomMap.get(roomId)?.messageList ?? [])],
                  previewMessage: latestChat,
                }),
              }),
              false,
              { type: `ChatStore setRoomMap ${roomId} on Chat` },
            );
          }

          if (previewMessage) {
            // # (Given) http roomInfo 응답 시
            // latest ChatContent 가져옴
            // previewMessage가 이에 해당함.
            set(
              (prev) => ({
                ...prev,
                roomMap: new Map(prev.roomMap).set(roomId, {
                  roomId,
                  opponentUser,
                  productInfo,
                  // * (Then) previewMessage 최신화
                  previewMessage,
                  // 기존 리스트 그대로 유지
                  messageList: prev.roomMap.get(roomId)?.messageList ?? [],
                }),
              }),
              false,
              { type: `ChatStore setRoomMap ${roomId} on RoomInfo` },
            );
          }

          // if (previousMessageList) {
          //   // # (Given) http Previous chat list 응답 시
          //   set((prev) => ({
          //     ...prev,
          //     roomMap: new Map(prev.roomMap).set(roomId, {
          //       roomId,
          //       opponentUser,
          //       productInfo,

          //       // ? (When) previous 요청이 채팅방 진입 최초 요청이면 어차피 messageList에 아무것도 없음.
          //       // ? (When) previous 요청이 채팅방 진입 최초 요청이 아니면 기존 리스트에 그냥 추가해주면 됨.
          //       // * (Then): 그러므로 기존 리스트에 그냥 추가해주면 됨.
          //       messageList: [...(prev.roomMap.get(roomId)?.messageList ?? []), ...previousMessageList],
          //       // previewMessage는 그대로 유지
          //       previewMessage: prev.roomMap.get(roomId)?.previewMessage,
          //     }),
          //   }));
          // }

          // LEAVE일 때는 해당 room 삭제?
        } catch (error) {
          console.error(error);
        }
      },
      appendPreviousMessageList: ({ previousMessageList, roomId }) => {
        const roomStateFromGet = get().roomMap.get(roomId);

        if (!roomStateFromGet) {
          return;
        }

        set(
          (prev) => {
            const p = prev.roomMap.get(roomId) ?? roomStateFromGet;

            return {
              ...p,
              roomMap: new Map(prev.roomMap).set(roomId, {
                ...p,
                messageList: [...(prev.roomMap.get(roomId)?.messageList ?? []), ...previousMessageList],
              }),
            };
          },
          false,
          { type: `ChatStore appendPreviousMessageList ${roomId}` },
        );
      },
      setSelectedChatRoomId: (roomId) => {
        set(
          (prev) => ({
            ...prev,
            selectedChatRoomId: roomId,
          }),
          false,
          { type: `ChatStore selectroom ${roomId}` },
        );
      },
      setWebSocketClient: (webSocketClient) => {
        set((prev) => ({
          ...prev,
          webSocketClient,
        }));
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
          console.log(chatRequestBody); // 보내는 값이 제대로 담겼는지 확인

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
      anonymousActionType: 'ChatStore action',
      enabled: process.env.NODE_ENV === 'development',
      name: 'ChatStore',
    },
  ),
  shallow,
);
