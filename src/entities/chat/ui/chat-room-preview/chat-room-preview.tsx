import { useQueryClient } from '@tanstack/react-query';

import { chatQueryKeys } from '@entities/chat/apis';
import { ChatStoreState, RoomInfo } from '@entities/chat/model';
import { getTimeDiffText } from '@entities/chat/utils';
import { GetUserInfoResponse } from '@shared/apis/user-api';

import * as S from './style';

/**
 * Opponent info, room info, product info에 대한 정보를 받아야 함
 */
export interface ChatPreviewProps extends RoomInfo {
  userInfo: GetUserInfoResponse;
  selectedChatRoomId: number | undefined;
  setSelectedChatRoomId: ChatStoreState['setSelectedChatRoomId'];
  // webSocketClient: Client | undefined;
  roomMap: ChatStoreState['roomMap'];
  // setRoomMap: ChatStoreState['setRoomMap'];
}

/**
 * ENTER일 때 채팅방 목록 중 하나 컴포넌트
 * - subscribe 되는 순간에 ENTER가 publish됨.
 * - ENTER 타입으로 받아온 채팅 내용 10개에서 각 채팅방의 마지막 채팅 내용을 보여줌.
 *
 */
const ChatRoomPreview = ({
  roomId,
  opponentUser,
  productInfo,
  // orderId,
  userInfo,
  selectedChatRoomId,
  // webSocketClient,
  roomMap,
  setSelectedChatRoomId,
  // setRoomMap,
}: ChatPreviewProps) => {
  // useEffect(() => {
  //   if (!webSocketClient || webSocketClient.connected === false) {
  //     console.log('websocket 도대체 왜 안 담김?');

  //     return;
  //   }

  //   console.log('여기로 넘어오면 webSocketClient 담긴 거임');

  //   // webSocketClient.subscribe(`/topic/chatroom/${roomId}`, (unParsedMessage) => {
  //   //   console.log('------------------subscribed----------------');
  //   //   console.log(opponentUser);
  //   //   console.log(productInfo);
  //   //   console.log(orderId);
  //   //   console.log(unParsedMessage);
  //   //   setRoomMap({
  //   //     roomId,
  //   //     unParsedMessage,
  //   //     opponentUser,
  //   //     productInfo,
  //   //     orderId,
  //   //   });
  //   // });

  //   // return () => {
  //   //   if (webSocketClient.connected) {
  //   //     webSocketClient.unsubscribe(`/topic/chatroom/${roomId}`);
  //   //   }
  //   // };
  // }, [webSocketClient, setRoomMap, roomId, opponentUser, orderId, productInfo]);

  const queryClient = useQueryClient();

  const selectRoom = async () => {
    // await queryClient.invalidateQueries({ queryKey: chatQueryKeys.all(), type: 'all', refetchType: 'all' });
    await queryClient.invalidateQueries({
      queryKey: chatQueryKeys.previousChatList(roomId),
      type: 'all',
      refetchType: 'all',
    });
    setSelectedChatRoomId(roomId);
  };

  const lastPreviewMessage = roomMap.get(roomId)?.previewMessage;

  const senderName =
    lastPreviewMessage && lastPreviewMessage.sender === userInfo.id ? userInfo.nickname : opponentUser.nickname;

  const time =
    lastPreviewMessage && lastPreviewMessage.messageTime ? getTimeDiffText(lastPreviewMessage.messageTime) : '대화없음';
  const isChatRoomUnfolded = selectedChatRoomId === roomId;

  return (
    <S.ChatPreviewWrapper type='button' onClick={selectRoom} $isChatRoomUnfolded={isChatRoomUnfolded}>
      <S.ProductImageWrap>
        {/* TODO: 화면 분기별 프로필 사이즈 정해지면 sizes 수정 */}
        {/* 마지막에 말한 사람의 정보 */}
        <S.ProductImage
          priority
          fill
          sizes='68px'
          quality={100}
          src={productInfo.thumbnailImage}
          alt={`${productInfo.productName} 상품 이미지`}
        />
      </S.ProductImageWrap>
      <S.MessageDetails>
        <S.MessageMeta>
          {/* 마지막 채팅 보낸 사람 */}
          <S.SenderName>{senderName}</S.SenderName>
          <S.SentTime>{time}</S.SentTime>
        </S.MessageMeta>
        <S.MessageContent $isChatRoomUnfolded={isChatRoomUnfolded}>{lastPreviewMessage?.message}</S.MessageContent>
      </S.MessageDetails>
    </S.ChatPreviewWrapper>
  );
};

export default ChatRoomPreview;
