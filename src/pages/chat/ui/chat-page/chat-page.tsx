import { useEffect } from 'react';

import Head from 'next/head';
import { useShallow } from 'zustand/react/shallow';

import { CHAT_TEXTAREA_SIZE } from '@entities/chat/constants/style';
import { useChatFormTextareaSizeControl, useGetChatRoomList } from '@entities/chat/hooks';
import { useChatStore } from '@entities/chat/model';
import { ChatRoom, ChatRoomPreview } from '@entities/chat/ui';
import { useUserStore } from '@entities/user/model';
import { SendChatForm } from '@features/chat/send-chat/ui';
import { useSetRoomMapOnWebSocketConnect } from '@pages/chat/hooks/use-set-room-map-on-web-socket-connect';

import * as S from './style';

export const ChatPage = () => {
  const { userInfo } = useUserStore((state) => ({ userInfo: state.userInfo }));
  const { data, status } = useGetChatRoomList();

  const { selectedChatRoomId, setWebSocketClient, setInitialRoomMap, setSelectedChatRoomId } = useChatStore(
    useShallow((state) => ({
      selectedChatRoomId: state.selectedChatRoomId,
      setWebSocketClient: state.setWebSocketClient,
      setInitialRoomMap: state.setInitialRoomMap,
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
    setWebSocketClient();
  }, [setWebSocketClient]);

  useSetRoomMapOnWebSocketConnect({ data, status });

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
