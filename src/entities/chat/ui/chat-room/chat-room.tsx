import { ReactNode, useEffect, useMemo } from 'react';

import Link from 'next/link';

import {
  CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY,
  CHAT_CONFIRM_MODAL_KEY,
  CHAT_MESSAGE_DELETE_MODAL_KEY,
} from '@entities/chat/constants/modal-key';
import { useGetPreviousChatList } from '@entities/chat/hooks';
import { UseChatFormTextareaSizeControlReturn } from '@entities/chat/hooks/use-chat-form-textarea-size-control';
import { useChatStore } from '@entities/chat/model';
import { insertMessageGroupForDisplay } from '@entities/chat/utils/insert-message-group-for-display';
import { useUserStore } from '@entities/user/model';
import { useInView } from '@shared/hooks/use-in-view';
import { useModalList } from '@shared/hooks/use-modal';
import { formatPriceToKoStyle } from '@shared/utils/price';

import * as S from './style';
import { ChatDateMessage } from '../chat-date-message';
import { MyChatMessage } from '../my-chat-message';
import { OpponentChatMessage } from '../opponent-chat-message';
import { UnselectedChatRoomDisplay } from '../unselected-chat-room-display';

interface ChatRoomProps extends Pick<UseChatFormTextareaSizeControlReturn, 'changedTextAreaHeight'> {
  formInFooter: ReactNode;
}

/**
 * 현재 선택된 roomId에 해당하는 채팅방을 보여주는 컴포넌트
 */
export const ChatRoom = ({ formInFooter, changedTextAreaHeight }: ChatRoomProps) => {
  const { userInfo } = useUserStore((state) => ({ userInfo: state.userInfo }));
  const { openModalList, closeModalList } = useModalList();

  const { roomMap, selectedChatRoomId, appendPreviousMessageList } = useChatStore((state) => ({
    roomMap: state.roomMap,
    selectedChatRoomId: state.selectedChatRoomId,
    appendPreviousMessageList: state.appendPreviousMessageList,
  }));

  const { isPlaceholderData, fetchNextPage, hasNextPage } = useGetPreviousChatList({
    roomId: selectedChatRoomId,
  });

  const { intersectionObserveTargetRef } = useInView<HTMLDivElement>({
    withThrottle: {
      wait: 2000,
    },
    callback: (isIntersecting) => {
      if (isIntersecting && hasNextPage && !isPlaceholderData) {
        fetchNextPage({ throwOnError: true })
          .then(({ data, status }) => {
            if (status === 'success' && data && data.pages.length > 0) {
              if (selectedChatRoomId === undefined) {
                return;
              }

              // 이전 메시지 리스트를 추가해야 함.
              const previousMessageList = data.pages.flatMap((page) => {
                return page.messageList;
              });

              // 이전 메시지 리스트 길이가 0이면 추가하지 않음
              if (previousMessageList.length === 0) {
                return;
              }

              appendPreviousMessageList({
                roomId: selectedChatRoomId,
                /**
                 * previousMessageList: data.pages[data.pages.length - 1].messageList,
                 * maxPages가 1임.
                 * 그렇기 때문에 어차피 들고 있는 pages에 page가 단 한 개 밖에 없음.
                 * 1페이지에는 최신 메시지가 있음.
                 */
                previousMessageList,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  // selectedChatRoomId undefined여도 상관없음. UnselectedChatRoomDisplay 컴포넌트 보여주면 됨.
  const roomState = roomMap.get(selectedChatRoomId!);
  const { messageList, productInfo, opponentUser } = roomState ?? {};

  // TODO: data 로직은 store에 있는 것이고 ui 로직은 component state로 관리해야 함.
  // const [messageGroupListForDisplay, setMessageGroupListForDisplay] = useState<MessageGroupListForDisplay>([]);

  const handleConfirmTransaction = async () => {
    const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
      (module) => module.ConfirmModalFrame,
    );

    const handleConfirm = () => {
      closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY });
    };

    openModalList({
      ModalComponent,
      modalKey: CHAT_CONFIRM_MODAL_KEY,
      props: {
        modalMessage: <S.ModalMessage>거래를 확정하시겠습니까?</S.ModalMessage>,
        modalFooter: (
          <S.ButtonGroup>
            <Link type='button' href={`/product/${productInfo?.price}`} onClick={handleConfirm}>
              거래확정
            </Link>
            <button type='button' onClick={() => closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY })}>
              취소
            </button>
          </S.ButtonGroup>
        ),
      },
    });
  };

  const openNotifyMessageDeleteModal = async () => {
    const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
      (module) => module.ConfirmModalFrame,
    );

    const handleConfirm = () => {
      closeModalList({ modalKey: CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY });
    };

    openModalList({
      ModalComponent,
      modalKey: CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY,
      props: {
        modalMessage: <S.ModalMessage>메세지 삭제가 완료되었습니다.</S.ModalMessage>,
        modalFooter: (
          <S.ModalFooterOnelineButton type='button' onClick={handleConfirm}>
            확인
          </S.ModalFooterOnelineButton>
        ),
      },
    });
  };

  const handleDeleteMessage = async () => {
    const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
      (module) => module.ConfirmModalFrame,
    );

    const handleConfirm = async () => {
      await closeModalList({ modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY });
      console.log('메세지 삭제 api 호출');
      openNotifyMessageDeleteModal();
    };

    openModalList({
      ModalComponent,
      modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY,
      props: {
        modalMessage: (
          <S.ModalMessage>
            메세지를 삭제하시겠습니까?
            {`\n`}
            삭제 후 복구는 불가능합니다.
          </S.ModalMessage>
        ),
        modalFooter: (
          <S.ButtonGroup>
            <button type='button' onClick={handleConfirm}>
              확인
            </button>
            <button type='button' onClick={() => closeModalList({ modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY })}>
              취소
            </button>
          </S.ButtonGroup>
        ),
      },
    });
  };

  useEffect(
    () => () => {
      // unmount 시에는 모달을 닫아준다.
      closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY });
      closeModalList({ modalKey: CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY });
      closeModalList({ modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY });
    },
    [],
  );

  const messageGroupListForDisplay = useMemo(() => {
    return insertMessageGroupForDisplay({ messageList: messageList ?? [] });
  }, [messageList]);

  if (selectedChatRoomId === undefined || !messageList || !productInfo || !opponentUser || !userInfo) {
    return (
      <S.ChatRoomWrapper>
        <UnselectedChatRoomDisplay />
      </S.ChatRoomWrapper>
    );
  }

  const { id: productId, thumbnailImage, price, productName, saleState } = productInfo;
  // const { id: productId, imageThumbnail, price, productName, saleState } = productInfo ?? {};
  // const { id: opponentUserId, nickname, profileImage: opponentUserProfileImage } = opponentUser;
  // const { id: myId, email, nickname, profileImage: myProfileImage, stars, userDesc } = userInfo;
  // 근데 이것도 리렌더링 때 전부 다시 계산해야 함.
  // const messageGroupForDisplay = insertMessageGroupForDisplay({ messageList });

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
            <S.RightAngleBracketLink
              aria-label='해당 상품 상세 페이지 이동 링크'
              href={`/product?productId=${productId}`}
            >
              <S.RightAngleBracketIcon />
            </S.RightAngleBracketLink>
          </S.ProductThumbnailBox>
          <S.ProductDesc>
            <S.ProductSaleState>{saleState}</S.ProductSaleState>
            <S.ProductName>{productName}</S.ProductName>
            <S.ProductPrice>{formatPriceToKoStyle(price)}</S.ProductPrice>
          </S.ProductDesc>
        </S.ProductMeta>
        <S.ConfirmTransactionButton type='button' onClick={handleConfirmTransaction}>
          거래확정하기
        </S.ConfirmTransactionButton>
      </S.ChatRoomHeader>

      {/* Body */}
      <S.ChatRoomBodyWrapper $changedTextAreaHeight={changedTextAreaHeight.changedHeight}>
        <S.ChatRoomBody>
          {messageGroupListForDisplay.map((messageGroup, groupListIdx) => {
            if (messageGroup.messageGroupType === 'DATE') {
              const { messageGroupId, timeDisplayMessage } = messageGroup;

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
        </S.ChatRoomBody>
      </S.ChatRoomBodyWrapper>

      {/* Footer */}
      {formInFooter}
    </S.ChatRoomWrapper>
  );
};
