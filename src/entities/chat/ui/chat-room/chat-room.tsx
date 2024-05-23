import { ReactNode, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';

import { useGetPreviousChatList, useResetRoomScrollHeight } from '@entities/chat/hooks';
import { useAppendPreviousMessageList } from '@entities/chat/hooks/use-append-previous-message-list';
import { UseChatFormTextareaSizeControlReturn } from '@entities/chat/hooks/use-chat-form-textarea-size-control';
import { useThrottledFetchNextPage } from '@entities/chat/hooks/use-throttled-fetch-next-page';
import { useChatStore } from '@entities/chat/model';
import { handleDeleteMessageImpl, openNotifyMessageDeleteModalImpl } from '@entities/chat/utils';
import { handleConfirmTransactionImpl } from '@entities/chat/utils/handle-confirm-transaction-impl';
import { insertMessageGroupForDisplay } from '@entities/chat/utils/insert-message-group-for-display';
import { useCompleteTransaction } from '@entities/order/hooks';
import { GetUserInfoResponse } from '@shared/apis/user-api';
import { useInViewWithoutCallback } from '@shared/hooks/use-in-view';
import { useModalList } from '@shared/hooks/use-modal';
import { Spinner } from '@shared/ui/loading/spinner';
import { formatPriceToKoStyle } from '@shared/utils/price';

import * as S from './style';
import { ChatDateMessage } from '../chat-date-message';
import { MyChatMessage } from '../my-chat-message';
import { OpponentChatMessage } from '../opponent-chat-message';
import { UnselectedChatRoomDisplay } from '../unselected-chat-room-display';

interface ChatRoomProps extends Pick<UseChatFormTextareaSizeControlReturn, 'changedTextAreaHeight'> {
  formInFooter: ReactNode;
  userInfo: GetUserInfoResponse;
}

/**
 * 현재 선택된 roomId에 해당하는 채팅방을 보여주는 컴포넌트
 */
export const ChatRoom = ({ formInFooter, changedTextAreaHeight, userInfo }: ChatRoomProps) => {
  const router = useRouter();
  const { openModalList, closeModalList, destroy } = useModalList();

  const { appendPreviousMessageList, selectedChatRoomId, chatRoomLocalRoomState } = useChatStore(
    useShallow((state) => ({
      appendPreviousMessageList: state.appendPreviousMessageList,
      selectedChatRoomId: state.selectedChatRoomId,
      chatRoomLocalRoomState: state.selectedChatRoomId ? state.roomMap.get(state.selectedChatRoomId) : undefined,
    })),
  );

  // TODO: _completeTransactionStatus 사용해서 페이지 넘어가기 전 Loading 구현하기
  const { mutate, status: _completeTransactionStatus } = useCompleteTransaction();

  const { intersectionObserveTargetRef, isIntersecting } = useInViewWithoutCallback<HTMLDivElement>({
    dependencyList: [selectedChatRoomId, chatRoomLocalRoomState],
  });

  const { fetchNextPage, isFetchingNextPage, isFetching, isPlaceholderData, hasNextPage, data, status } =
    useGetPreviousChatList({
      roomId: selectedChatRoomId,
    });

  useAppendPreviousMessageList({
    selectedChatRoomId,
    status,
    data,
    isPlaceholderData,
    chatRoomLocalRoomState,
    appendPreviousMessageList,
  });

  useThrottledFetchNextPage({
    fetchNextPage,
    hasNextPage,
    isIntersecting,
    isPlaceholderData,
    isFetchingNextPage,
    isFetching,
    selectedChatRoomId,
  });

  const { currentRoomBodyRef } = useResetRoomScrollHeight({ selectedChatRoomId });

  const handleConfirmTransaction = async ({ orderId, productId }: { orderId: number; productId: number }) => {
    handleConfirmTransactionImpl({ closeModalList, mutate, openModalList, orderId, productId, router });
  };

  const openNotifyMessageDeleteModal = async () => {
    openNotifyMessageDeleteModalImpl({ closeModalList, openModalList });
  };

  const handleDeleteMessage = async () => {
    handleDeleteMessageImpl({ openModalList, closeModalList, openNotifyMessageDeleteModal });
  };

  useEffect(
    () => () => {
      // unmount 시에는 모달을 닫아준다.
      destroy();
    },
    [],
  );

  // 현재 roomId에 해당하는 채팅방의 메시지 리스트를 가공하여 보여주는 컴포넌트
  const messageGroupListForDisplay = useMemo(() => {
    return insertMessageGroupForDisplay({ messageList: chatRoomLocalRoomState?.messageList ?? [] });
  }, [chatRoomLocalRoomState?.messageList]);

  if (selectedChatRoomId === undefined || !chatRoomLocalRoomState) {
    return (
      <S.ChatRoomWrapper>
        <UnselectedChatRoomDisplay />
      </S.ChatRoomWrapper>
    );
  }

  const { orderId, productInfo, opponentUser } = chatRoomLocalRoomState;
  const { id: productId, thumbnailImage, price, productName, saleState } = productInfo;

  return (
    <S.ChatRoomWrapper>
      {/* Header */}
      {/* ProductInfo undefined인 동안 스켈레톤 표시해야 함. */}
      <S.ChatRoomHeader>
        <S.ProductMeta>
          <S.ProductThumbnailBox>
            <S.ProductThumbnail
              fill
              quality={100}
              sizes='68px'
              src={thumbnailImage}
              alt='상품 썸네일 이미지'
              priority
            />
            <S.RightAngleBracketLink aria-label='해당 상품 상세 페이지 이동 링크' href={`/product/${productId}`}>
              <S.RightAngleBracketIcon />
            </S.RightAngleBracketLink>
          </S.ProductThumbnailBox>
          <S.ProductDesc>
            <S.ProductSaleState>{saleState}</S.ProductSaleState>
            <S.ProductName>{productName}</S.ProductName>
            <S.ProductPrice>{formatPriceToKoStyle(price)}</S.ProductPrice>
          </S.ProductDesc>
        </S.ProductMeta>
        <S.ConfirmTransactionButton type='button' onClick={() => handleConfirmTransaction({ orderId, productId })}>
          거래확정하기
        </S.ConfirmTransactionButton>
      </S.ChatRoomHeader>

      {/* Body */}
      <S.ChatRoomBodyWrapper>
        <S.ChatRoomBody ref={currentRoomBodyRef} $changedTextAreaHeight={changedTextAreaHeight.changedHeight}>
          {messageGroupListForDisplay.map((messageGroup, groupListIdx) => {
            if (messageGroup.messageGroupType === 'DATE') {
              const { messageGroupId, timeDisplayMessage } = messageGroup;

              // 날짜 표시 메시지
              return (
                <ChatDateMessage
                  ref={
                    groupListIdx + 1 === messageGroupListForDisplay.length ? intersectionObserveTargetRef : undefined
                  }
                  key={messageGroupId}
                  timeDisplayMessage={timeDisplayMessage}
                />
              );
            }

            const { messageGroupId, messageGroupTime, messageListInGroup, sender } = messageGroup;

            return (
              <S.MessageGroup key={messageGroupId}>
                {messageListInGroup.map((message, indexInMessageListOfGroup) => {
                  const { message: messageText, messageId, messageTime } = message;
                  const isFirstIndex = indexInMessageListOfGroup === 0;

                  if (sender === userInfo.id) {
                    // 내 채팅 메시지
                    return (
                      <MyChatMessage
                        key={messageId}
                        handleDeleteMessage={handleDeleteMessage}
                        isFirstIndex={isFirstIndex}
                        messageGroupTime={messageGroupTime}
                        messageText={messageText}
                        messageTime={messageTime}
                      />
                    );
                  }

                  // 상대방 채팅 메시지
                  return (
                    <OpponentChatMessage
                      key={messageId}
                      isOldestMessageInMessageListOfGroup={indexInMessageListOfGroup === messageListInGroup.length - 1}
                      isFirstIndex={isFirstIndex}
                      messageGroupTime={messageGroupTime}
                      messageText={messageText}
                      messageTime={messageTime}
                      opponentUser={opponentUser}
                      handleDeleteMessage={handleDeleteMessage}
                    />
                  );
                })}
              </S.MessageGroup>
            );
          })}
          {isFetchingNextPage || isFetching ? <Spinner size='20px' /> : null}
        </S.ChatRoomBody>
      </S.ChatRoomBodyWrapper>

      {/* Footer */}
      {formInFooter}
    </S.ChatRoomWrapper>
  );
};
