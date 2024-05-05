import { useEffect } from 'react';

import { Client } from '@stomp/stompjs';

import { useGetChatRoomList } from '@entities/chat/hooks';
import { useChatStore } from '@entities/chat/model';
import { ChatRoom, ChatRoomPreview } from '@entities/chat/ui';
import { useUserStore } from '@entities/user/model';
import { SendChatForm } from '@features/chat/ui/send-chat-form/send-chat-form';

import * as S from './style';

export const ChatPage = () => {
  const { id } = useUserStore((state) => ({ id: state.userInfo?.id }));
  const { data, status } = useGetChatRoomList();

  const { setRoomMap, setWebSocketClient } = useChatStore((state) => ({
    setRoomMap: state.setRoomMap,
    setWebSocketClient: state.setWebSocketClient,
  }));

  useEffect(() => {
    if (id === undefined || status !== 'success') {
      return;
    }

    if (data.length === 0) {
      return;
    }

    if (typeof WebSocket !== 'function') {
      console.error('WebSocket is not supported in this browser.');

      return;
    }

    const stompClient = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WSS_URL,
      onConnect: () => {
        if (stompClient) {
          data.forEach(({ roomId, lastMessage, ...rest }) => {
            stompClient.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
              // ? 반복문 안에서 setState 안 되는 것으로 알고 있는데...?
              // 소켓 다 따로 연결해야 할 것 같은데...
              setRoomMap({ unParsedMessage, roomId, previewMessage: lastMessage, ...rest });
            });

            // stompClient.publish({
            //   destination: `/app/chat.addUser/${roomId}`,
            //   body: JSON.stringify({ sender: id, type: 'ENTER' }),
            // });
          });
        }
      },
    });

    try {
      // ?: 순서 상관 있을까?
      setWebSocketClient(stompClient);
      stompClient.activate();
    } catch (error) {
      console.error(error);
    }
  }, [status, data, id, setRoomMap, setWebSocketClient]);

  if (id === undefined || status !== 'success') {
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
    <S.Page>
      <S.ChatContentWrapper>
        <S.ChatPageMeta>채팅</S.ChatPageMeta>
        <S.ChatContentArea>
          <S.ChatRoomPreviewListWrapper>
            {data.map(({ roomId, ...rest }) => (
              <ChatRoomPreview key={roomId} roomId={roomId} {...rest} />
            ))}
          </S.ChatRoomPreviewListWrapper>
          <ChatRoom form={<SendChatForm />} />
        </S.ChatContentArea>
      </S.ChatContentWrapper>
    </S.Page>
  );
};
