import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { chatQueryKeys } from '@entities/chat/apis';
import { RoomInfo, useChatStore } from '@entities/chat/model';
import { getTimeDiffText } from '@entities/chat/utils';
import { GetUserInfoResponse } from '@shared/apis/user-api';

import * as S from './style';

/**
 * Opponent info, room info, product info에 대한 정보를 받아야 함
 */
export interface ChatPreviewProps extends RoomInfo {
  userInfo: GetUserInfoResponse;
}

/**
 * ENTER일 때 채팅방 목록 중 하나 컴포넌트
 * - subscribe 되는 순간에 ENTER가 publish됨.
 * - ENTER 타입으로 받아온 채팅 내용 10개에서 각 채팅방의 마지막 채팅 내용을 보여줌.
 *
 */
const ChatRoomPreview = ({ roomId, opponentUser, productInfo, userInfo }: ChatPreviewProps) => {
  const queryClient = useQueryClient();

  const { liveLastPreviewMessage, selectedChatRoomId, setSelectedChatRoomId } = useChatStore(
    useShallow((state) => ({
      liveLastPreviewMessage: state.roomMap.get(roomId)?.previewMessage,
      selectedChatRoomId: state.selectedChatRoomId,
      setSelectedChatRoomId: state.setSelectedChatRoomId,
    })),
  );

  const selectRoom = async () => {
    await queryClient.invalidateQueries({
      queryKey: chatQueryKeys.previousChatList(roomId),
      type: 'all',
      refetchType: 'all',
    });
    setSelectedChatRoomId(roomId);
  };

  const senderName =
    liveLastPreviewMessage && liveLastPreviewMessage.sender === userInfo.id ? userInfo.nickname : opponentUser.nickname;

  const time =
    liveLastPreviewMessage && liveLastPreviewMessage.messageTime
      ? getTimeDiffText(liveLastPreviewMessage.messageTime)
      : '대화없음';
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
        <S.MessageContent $isChatRoomUnfolded={isChatRoomUnfolded}>{liveLastPreviewMessage?.message}</S.MessageContent>
      </S.MessageDetails>
    </S.ChatPreviewWrapper>
  );
};

export default ChatRoomPreview;
