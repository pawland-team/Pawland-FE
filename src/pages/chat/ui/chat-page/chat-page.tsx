import { useEffect, useRef } from 'react';

import { Client } from '@stomp/stompjs';
import Head from 'next/head';
import { useShallow } from 'zustand/react/shallow';

import { CHAT_TEXTAREA_SIZE } from '@entities/chat/constants/style';
import { useChatFormTextareaSizeControl, useGetChatRoomList } from '@entities/chat/hooks';
import { useChatStore } from '@entities/chat/model';
import { ChatRoom, ChatRoomPreview } from '@entities/chat/ui';
import { useUserStore } from '@entities/user/model';
import { SendChatForm } from '@features/chat/send-chat/ui';

import * as S from './style';

export const ChatPage = () => {
  const { userInfo } = useUserStore((state) => ({ userInfo: state.userInfo }));
  const { data, status } = useGetChatRoomList();
  const stompRef = useRef<Client>();

  const {
    webSocketClient,
    selectedChatRoomId,
    setWebSocketClient,
    setInitialRoomMap,
    setRoomMap,
    setSelectedChatRoomId,
  } = useChatStore(
    useShallow((state) => ({
      webSocketClient: state.webSocketClient,
      selectedChatRoomId: state.selectedChatRoomId,
      setWebSocketClient: state.setWebSocketClient,
      setInitialRoomMap: state.setInitialRoomMap,
      setRoomMap: state.setRoomMap,
      setSelectedChatRoomId: state.setSelectedChatRoomId,
    })),
  );

  const { changedTextAreaHeight, ...sizeControlRest } = useChatFormTextareaSizeControl({
    // id가 undefined면 DOM 렌더링 하지 않도록 해놨음(return null).
    // DOM 렌더링 안 되면 ref에 node가 담기지 않기 때문에 size 조절이 안 됨. -> id를 dependencyList에 추가
    dependencyListForObserver: [selectedChatRoomId, userInfo?.id, data, status],
    sizes: {
      onDesktop: {
        height: CHAT_TEXTAREA_SIZE.onDesktop.height,
        minHeight: CHAT_TEXTAREA_SIZE.onDesktop.minHeight,
        maxHeight: CHAT_TEXTAREA_SIZE.onDesktop.maxHeight,
      },
    },
  });

  useEffect(() => {
    if (userInfo?.id && status === 'success' && data) {
      setInitialRoomMap(data);
    }
  }, [userInfo?.id, status, data]);

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
  }, []);

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
  }, [webSocketClient, data, data?.length, status]);

  // 언마운트 될 때 selectedChatRoomId 초기화
  useEffect(() => () => setSelectedChatRoomId(), [setSelectedChatRoomId]);

  if (userInfo?.id === undefined || status !== 'success') {
    // TODO: status === 'error' || status === 'loading'일 때 처리 분기하기
    return null;
  }

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
                <ChatRoomPreview key={roomId} userInfo={userInfo} roomId={roomId} {...rest} />
              ))}
            </S.ChatRoomPreviewListWrapper>
            <ChatRoom
              userInfo={userInfo}
              changedTextAreaHeight={changedTextAreaHeight}
              formInFooter={
                <SendChatForm userInfo={userInfo} changedTextAreaHeight={changedTextAreaHeight} {...sizeControlRest} />
              }
            />
          </S.ChatContentArea>
        </S.ChatContentWrapper>
      </S.Page>
    </>
  );
};
