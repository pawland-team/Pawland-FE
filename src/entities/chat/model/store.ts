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
        console.log(initialChatRoomList);
        // Map에 담아서 초기화
        const initialRoomMap = new Map<RoomState['roomId'], RoomState>();

        if (!initialChatRoomList) {
          return;
        }

        // 반복문 안에서는 setState 불가능하므로 forEach 돌려서 Map에 담은 후에 그 Map을 setState에 담음
        [...initialChatRoomList].forEach((roomInfo) => {
          const { roomId, opponentUser, productInfo, lastMessage, orderId } = roomInfo;

          initialRoomMap.set(roomId, {
            roomId,
            opponentUser,
            productInfo,
            orderId,
            messageList: lastMessage ? [lastMessage] : [],
            // TODO: null로 타입 개선하기
            previewMessage: lastMessage ?? undefined,
          });
        });

        console.log(initialRoomMap);

        set(
          (prev) => ({
            ...prev,
            roomMap: initialRoomMap,
          }),
          false,
          { type: 'ChatStore/SetInitialRoomMap' },
        );

        console.log(get().roomMap);
        console.log(get());
      },
      setRoomMap: ({ roomId, opponentUser, productInfo, unParsedMessage, orderId }) => {
        console.log('s-0');

        try {
          console.log('s-1');

          if (unParsedMessage) {
            // # (Given) websocket 응답 시
            const { body } = unParsedMessage;
            const data = JSON.parse(body) as WebSocketChatResponse;

            console.log('s-2');

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
                  orderId,
                  // * (Then) 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가
                  // 새로운 메시지가 오면 기존 리스트의 맨 앞에 추가(column-reverse 방식으로 구현하기 위함)
                  // 0 번째 인덱스를 맨 밑으로 보내기 위함
                  messageList: [latestChat, ...(prev.roomMap.get(roomId)?.messageList ?? [])],
                  previewMessage: latestChat,
                }),
              }),
              false,
              { type: 'ChatStore/SetRoomMap' },
            );
          }

          // if (previewMessage) {
          //   // # (Given) http roomInfo 응답 시
          //   // latest ChatContent 가져옴
          //   // previewMessage가 이에 해당함.

          //   console.log('s-3');

          //   set(
          //     (prev) => ({
          //       ...prev,
          //       roomMap: new Map(prev.roomMap).set(roomId, {
          //         roomId,
          //         opponentUser,
          //         productInfo,
          //         orderId,
          //         // * (Then) previewMessage 최신화
          //         previewMessage,
          //         // 기존 리스트 그대로 유지
          //         messageList: prev.roomMap.get(roomId)?.messageList ?? [],
          //       }),
          //     }),
          //     false,
          //     { type: `ChatStore setRoomMap ${roomId} on RoomInfo` },
          //   );
          // }

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
      setInitialMessageList: ({ initialMessageList, roomId }) => {
        const roomStateFromGet = get().roomMap.get(roomId);

        console.log(roomStateFromGet);

        if (!roomStateFromGet) {
          return;
        }

        // initial이기 때문에 messageList와 previewMessage를 덮어써야 함
        set((prev) => {
          const p = prev.roomMap.get(roomId) ?? roomStateFromGet;

          return {
            ...prev,
            roomMap: new Map(prev.roomMap).set(roomId, {
              ...p,
              previewMessage: initialMessageList[0],
              messageList: initialMessageList,
            }),
          };
        });
      },
      appendPreviousMessageList: ({ previousMessageList, roomId }) => {
        const roomStateFromGet = get().roomMap.get(roomId);

        console.log(roomStateFromGet);

        if (!roomStateFromGet) {
          return;
        }

        set(
          (prev) => {
            const p = prev.roomMap.get(roomId) ?? roomStateFromGet;

            return {
              // TODO: double check
              ...prev,
              // roomMap: new Map(prev.roomMap).set(roomId, {
              //   ...p,
              //   messageList: [...(prev.roomMap.get(roomId)?.messageList ?? []), ...previousMessageList],
              // }),
              roomMap: new Map(prev.roomMap).set(roomId, {
                ...p,
                previewMessage: p.previewMessage ? p.previewMessage : previousMessageList[0],
                roomId: p.roomId,
                messageList: [...(prev.roomMap.get(roomId)?.messageList ?? []), ...previousMessageList],
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
            selectedChatRoomId: roomId,
          }),
          false,
          { type: 'ChatStore/SelectRoom' },
        );
      },
      setWebSocketClient: (webSocketClient) => {
        console.log(get().webSocketClient);
        console.log(webSocketClient);

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
        console.log(get().webSocketClient);
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
      // enabled: process.env.NODE_ENV === 'development',
      name: 'ChatStore',
    },
  ),
);
