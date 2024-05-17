import { useEffect, useRef, useState } from 'react';

import { Client } from '@stomp/stompjs';
import Head from 'next/head';
import { useShallow } from 'zustand/react/shallow';

import { CHAT_TEXTAREA_SIZE } from '@entities/chat/constants/style';
import { useChatFormTextareaSizeControl, useGetChatRoomList } from '@entities/chat/hooks';
import { RoomState, useChatStore } from '@entities/chat/model';
import { ChatRoom, ChatRoomPreview } from '@entities/chat/ui';
import { useUserStore } from '@entities/user/model';
import { SendChatForm } from '@features/chat/send-chat/ui';

import * as S from './style';

export const ChatPage = () => {
  const { userInfo } = useUserStore((state) => ({ userInfo: state.userInfo }));
  const { data, status } = useGetChatRoomList();
  const stompRef = useRef<Client>();

  // 작동 안 돼서 전부 끌어올렸음.
  const {
    webSocketClient,
    selectedChatRoomId,
    roomMap,
    setWebSocketClient,
    setInitialRoomMap,
    setRoomMap,
    appendPreviousMessageList,
    sendChatMessage,
    setSelectedChatRoomId,
  } = useChatStore(
    useShallow((state) => ({
      setRoomMap: state.setRoomMap,
      roomMap: state.roomMap,
      setWebSocketClient: state.setWebSocketClient,
      setInitialRoomMap: state.setInitialRoomMap,
      webSocketClient: state.webSocketClient,
      selectedChatRoomId: state.selectedChatRoomId,
      appendPreviousMessageList: state.appendPreviousMessageList,
      sendChatMessage: state.sendChatMessage,
      setSelectedChatRoomId: state.setSelectedChatRoomId,
    })),
  );
  const [chatRoomLocalRoomState, setChatRoomLocalRoomState] = useState<RoomState>();

  const { changedTextAreaHeight, ...sizeControlRest } = useChatFormTextareaSizeControl({
    // id가 undefined면 DOM 렌더링 하지 않도록 해놨음(return null).
    // DOM 렌더링 안 되면 ref에 node가 담기지 않기 때문에 size 조절이 안 됨. -> id를 dependencyList에 추가
    dependencyListForObserver: [selectedChatRoomId, roomMap, userInfo?.id, data, status, chatRoomLocalRoomState],
    sizes: {
      onDesktop: {
        height: CHAT_TEXTAREA_SIZE.onDesktop.height,
        minHeight: CHAT_TEXTAREA_SIZE.onDesktop.minHeight,
        maxHeight: CHAT_TEXTAREA_SIZE.onDesktop.maxHeight,
      },
    },
  });

  useEffect(() => {
    if (userInfo?.id === undefined || status !== 'success' || data.length === 0) {
      console.log(1);

      return;
    }

    if (webSocketClient) {
      console.log(webSocketClient);

      if (!webSocketClient.active) {
        webSocketClient.activate();
      }

      return;
    }

    if (typeof WebSocket !== 'function') {
      console.error('WebSocket is not supported in this browser.');

      return;
    }

    // const stompClient = new Client({
    //   brokerURL: process.env.NEXT_PUBLIC_WSS_URL,
    //   onConnect: () => {
    //     if (stompClient) {
    //       console.log(3);

    //       console.log(data);

    //       setInitialRoomMap(data);

    //       // data.forEach(({ roomId, lastMessage, orderId, opponentUser, productInfo }) => {
    //       //   console.log(4);

    //       //   setRoomMap({ unParsedMessage, roomId, previewMessage: lastMessage, orderId, ...rest });

    //       //   stompClient.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
    //       //     // ? 반복문 안에서 setState 안 되는 것으로 알고 있는데...?
    //       //     // 소켓 다 따로 연결해야 할 것 같은데...

    //       //     console.log(orderId);
    //       //     setRoomMap({ unParsedMessage, roomId, previewMessage: lastMessage, orderId, ...rest });
    //       //   });

    //       //   // stompClient.publish({
    //       //   //   destination: `/app/chat.addUser/${roomId}`,
    //       //   //   body: JSON.stringify({ sender: id, type: 'ENTER' }),
    //       //   // });
    //       // });
    //     }
    //   },
    // });
    stompRef.current = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WSS_URL,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // beforeConnect: () => {
      //   setInitialRoomMap(data);
      // }
      onConnect: () => {
        console.log(data);

        setInitialRoomMap(data);

        data.forEach(({ roomId, opponentUser, orderId, productInfo }) => {
          stompRef.current?.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
            console.log('------------------subscribed----------------');
            console.log(opponentUser);
            console.log(productInfo);
            console.log(orderId);
            console.log(unParsedMessage);
            setRoomMap({
              roomId,
              unParsedMessage,
              opponentUser,
              productInfo,
              orderId,
            });
          });
        });

        // data.forEach(({ roomId }) => {
        //   stompRef.current?.subscribe(`/topic/chatroom/${roomId}`, (message) => {
        //     const response = JSON.parse(message.body) as ChatContent;
        //     const { messageId, messageTime, sender } = response;
        //     console.log(typeof messageId);
        //     console.log(typeof messageTime);
        //     console.log(typeof sender);
        //   });
        // });

        // data.forEach(({ roomId, lastMessage, orderId, opponentUser, productInfo }) => {
        //   console.log(4);

        //   setRoomMap({ unParsedMessage, roomId, previewMessage: lastMessage, orderId, ...rest });

        //   stompClient.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
        //     // ? 반복문 안에서 setState 안 되는 것으로 알고 있는데...?
        //     // 소켓 다 따로 연결해야 할 것 같은데...

        //     console.log(orderId);
        //     setRoomMap({ unParsedMessage, roomId, previewMessage: lastMessage, orderId, ...rest });
        //   });

        //   // stompClient.publish({
        //   //   destination: `/app/chat.addUser/${roomId}`,
        //   //   body: JSON.stringify({ sender: id, type: 'ENTER' }),
        //   // });
        // });
      },
    });

    try {
      // ?: 순서 상관 있을까?
      console.log(stompRef.current);

      if (!stompRef.current.active) {
        stompRef.current.activate();
        setWebSocketClient(stompRef.current);
      }
    } catch (error) {
      console.error(error);
    }

    // return () => {
    //   if (webSocketClient.connected) {
    //     webSocketClient.unsubscribe(`/topic/chatroom/${roomId}`);
    //   }
    // };

    return () => {
      if (stompRef.current && stompRef.current.connected) {
        stompRef.current.deactivate();
      }
    };
  }, [status, data, userInfo?.id, webSocketClient, setInitialRoomMap, setWebSocketClient]);

  if (userInfo?.id === undefined || status !== 'success') {
    // TODO: status === 'error' || status === 'loading'일 때 처리 분기하기
    return null;
  }

  // if (status === 'error') {
  //   return <div>Error...</div>;
  // }

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Head>
        <title>Pawland :: 채팅하기</title>
      </Head>
      <S.Page>
        <S.ChatContentWrapper>
          <S.ChatPageMeta>채팅</S.ChatPageMeta>
          <S.ChatContentArea>
            <S.ChatRoomPreviewListWrapper>
              {data?.map(({ roomId, ...rest }) => (
                <ChatRoomPreview
                  key={roomId}
                  selectedChatRoomId={selectedChatRoomId}
                  setSelectedChatRoomId={setSelectedChatRoomId}
                  userInfo={userInfo}
                  roomId={roomId}
                  roomMap={roomMap}
                  {...rest}
                />
              ))}
            </S.ChatRoomPreviewListWrapper>
            <ChatRoom
              userInfo={userInfo}
              chatRoomLocalRoomState={chatRoomLocalRoomState}
              setChatRoomLocalRoomState={setChatRoomLocalRoomState}
              changedTextAreaHeight={changedTextAreaHeight}
              selectedChatRoomId={selectedChatRoomId}
              roomMap={roomMap}
              appendPreviousMessageList={appendPreviousMessageList}
              formInFooter={
                <SendChatForm
                  userInfo={userInfo}
                  sendChatMessage={sendChatMessage}
                  selectedChatRoomId={selectedChatRoomId}
                  changedTextAreaHeight={changedTextAreaHeight}
                  {...sizeControlRest}
                />
              }
            />
          </S.ChatContentArea>
        </S.ChatContentWrapper>
      </S.Page>
    </>
  );
};
