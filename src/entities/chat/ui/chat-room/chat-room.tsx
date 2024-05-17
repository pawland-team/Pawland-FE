import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import throttle from 'lodash/throttle';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';

import {
  CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY,
  CHAT_CONFIRM_MODAL_KEY,
  CHAT_MESSAGE_DELETE_MODAL_KEY,
} from '@entities/chat/constants/modal-key';
import { useGetPreviousChatList } from '@entities/chat/hooks';
import { UseChatFormTextareaSizeControlReturn } from '@entities/chat/hooks/use-chat-form-textarea-size-control';
import { ChatStoreState, RoomState, useChatStore } from '@entities/chat/model';
import { insertMessageGroupForDisplay } from '@entities/chat/utils/insert-message-group-for-display';
import { useCompleteTransaction } from '@entities/order/hooks';
import { ChatContent } from '@shared/apis/chat-api';
import { GetUserInfoResponse } from '@shared/apis/user-api';
import { useInView_v2 } from '@shared/hooks/use-in-view';
import { useModalList } from '@shared/hooks/use-modal';
import { formatPriceToKoStyle } from '@shared/utils/price';

import * as S from './style';
import { ChatDateMessage } from '../chat-date-message';
import { MyChatMessage } from '../my-chat-message';
import { OpponentChatMessage } from '../opponent-chat-message';
import { UnselectedChatRoomDisplay } from '../unselected-chat-room-display';

interface ChatRoomProps extends Pick<UseChatFormTextareaSizeControlReturn, 'changedTextAreaHeight'> {
  formInFooter: ReactNode;
  setChatRoomLocalRoomState: Dispatch<SetStateAction<RoomState | undefined>>;
  chatRoomLocalRoomState: RoomState | undefined;
  userInfo: GetUserInfoResponse;
  selectedChatRoomId?: number;
  roomMap: ChatStoreState['roomMap'];
  appendPreviousMessageList: ChatStoreState['appendPreviousMessageList'];
}

/**
 * 현재 선택된 roomId에 해당하는 채팅방을 보여주는 컴포넌트
 */
export const ChatRoom = ({
  formInFooter,
  changedTextAreaHeight,
  chatRoomLocalRoomState,
  userInfo,
  selectedChatRoomId,
  roomMap,
  setChatRoomLocalRoomState,
  appendPreviousMessageList,
}: ChatRoomProps) => {
  const router = useRouter();
  const { openModalList, closeModalList, destroy } = useModalList();
  // isFirstReder를 활용해서 첫 번째 렌더링일 경우에는 채팅 전체를 덮어쓸 것이고
  // 그 이후에는 이전 메세지 리스트에 추가하는 방식으로 사용할 것임.
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { setInitialMessageList } = useChatStore(
    useShallow((state) => ({ setInitialMessageList: state.setInitialMessageList })),
  );

  useEffect(() => {
    if (selectedChatRoomId !== undefined) {
      setChatRoomLocalRoomState(roomMap.get(selectedChatRoomId!));
    }
  }, [roomMap, selectedChatRoomId, setChatRoomLocalRoomState]);

  // TODO: _completeTransactionStatus 사용해서 페이지 넘어가기 전 Loading 구현하기
  const { mutate, status: _completeTransactionStatus } = useCompleteTransaction();

  const { intersectionObserveTargetRef, isIntersecting } = useInView_v2<HTMLDivElement>();

  const { isPlaceholderData, fetchNextPage, hasNextPage, data, status } = useGetPreviousChatList({
    roomId: selectedChatRoomId,
  });

  const throttledFetchNextPage = useCallback(
    throttle(() => {
      if (hasNextPage && !isPlaceholderData && isIntersecting) {
        fetchNextPage({ throwOnError: true })
          .then(({ data, status }) => {
            if (status === 'success' && data && data.pages.length > 0) {
              if (selectedChatRoomId === undefined) {
                return;
              }

              // 이전 메시지 리스트를 추가해야 함.
              const previousMessageList: ChatContent[] = data.pages.flatMap((page) => {
                return page.messageList.map<ChatContent>(({ sender, ...rest }) => ({
                  sender: Number(sender),
                  ...rest,
                }));
              });

              console.log(previousMessageList);

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
    }, 2000),
    [appendPreviousMessageList, fetchNextPage, hasNextPage, isPlaceholderData, selectedChatRoomId, isIntersecting],
  );

  // 최초 진입 시 로직
  useEffect(() => {
    if (!isFirstRender) {
      return;
    }

    if (status === 'success' && data) {
      // 최초 메시지는 해당 룸의 메시지 리스트를 덮어써야 함.
      const initialMessageList: ChatContent[] = data.pages.flatMap((page) => {
        return page.messageList.map<ChatContent>(({ sender, ...rest }) => ({
          sender: Number(sender),
          ...rest,
        }));
      });

      if (selectedChatRoomId === undefined) {
        return;
      }

      setInitialMessageList({
        roomId: selectedChatRoomId,
        initialMessageList,
      });

      setIsFirstRender(false);
    }
  }, [isFirstRender, status, data, selectedChatRoomId, setInitialMessageList]);

  // 스크롤 이벤트로 감지 시 로직
  useEffect(() => {
    if (isFirstRender === false && isIntersecting) {
      throttledFetchNextPage();
    }
  }, [throttledFetchNextPage, isIntersecting, isFirstRender]);

  // selectedChatRoomId undefined여도 상관없음. UnselectedChatRoomDisplay 컴포넌트 보여주면 됨.
  // const roomState = roomMap.get(selectedChatRoomId!);
  // const { messageList, productInfo, opponentUser, orderId } = roomState ?? {};

  // TODO: data 로직은 store에 있는 것이고 ui 로직은 component state로 관리해야 함.
  // const [messageGroupListForDisplay, setMessageGroupListForDisplay] = useState<MessageGroupListForDisplay>([]);

  const handleConfirmTransaction = async ({ orderId, productId }: { orderId: number; productId: number }) => {
    const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
      (module) => module.ConfirmModalFrame,
    );

    const handleConfirm = () => {
      mutate(
        { orderId, productId },
        {
          onSuccess: () => {
            router.push(`/product/${productId}`);
            closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY });
          },
        },
      );
    };

    openModalList({
      ModalComponent,
      modalKey: CHAT_CONFIRM_MODAL_KEY,
      props: {
        modalMessage: <S.ModalMessage>거래를 확정하시겠습니까?</S.ModalMessage>,
        modalFooter: (
          <S.ButtonGroup>
            <button type='button' onClick={handleConfirm}>
              거래확정
            </button>
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

  // useEffect(() => {
  //   // Prefetch the `/product/[productId]` page
  //   if (productInfo?.id) {
  //     router.prefetch(`/product/${productInfo.id}`);
  //   }
  // }, [router, productInfo?.id]);

  useEffect(
    () => () => {
      // unmount 시에는 모달을 닫아준다.
      destroy();
    },
    [],
  );

  // const messageGroupListForDisplay = useMemo(() => {
  //   return insertMessageGroupForDisplay({ messageList: messageList ?? [] });
  // }, [messageList]);
  const messageGroupListForDisplay = useMemo(() => {
    return insertMessageGroupForDisplay({ messageList: chatRoomLocalRoomState?.messageList ?? [] });
  }, [chatRoomLocalRoomState]);

  // if (selectedChatRoomId === undefined || !messageList || !productInfo || !opponentUser || !userInfo || !orderId) {
  // if (selectedChatRoomId === undefined || !productInfo || !opponentUser || !userInfo || !orderId) {
  //   console.log(selectedChatRoomId);
  //   console.log(productInfo);
  //   console.log(opponentUser);
  //   console.log(userInfo);
  //   console.log(orderId);

  //   return (
  //     <S.ChatRoomWrapper>
  //       <UnselectedChatRoomDisplay />
  //     </S.ChatRoomWrapper>
  //   );
  // }
  if (
    selectedChatRoomId === undefined ||
    !chatRoomLocalRoomState ||
    !chatRoomLocalRoomState.productInfo ||
    !chatRoomLocalRoomState.opponentUser ||
    typeof chatRoomLocalRoomState.orderId !== 'number'
  ) {
    return (
      <S.ChatRoomWrapper>
        <UnselectedChatRoomDisplay />
      </S.ChatRoomWrapper>
    );
  }

  const { orderId, productInfo, opponentUser } = chatRoomLocalRoomState;
  const { id: productId, thumbnailImage, price, productName, saleState } = productInfo;
  // const { id: productId, thumbnailImage, price, productName, saleState } = productInfo;
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
