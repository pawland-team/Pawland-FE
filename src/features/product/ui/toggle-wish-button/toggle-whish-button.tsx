import { MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import { ButtonGroup, ModalMessage } from '@entities/chat/ui/chat-room/style';
import { useGetUserInfo } from '@entities/user/hooks';
import { usePostMakeWishedMutation } from '@features/product/hooks';
import { usePostCancelWishedMutation } from '@features/product/hooks/use-post-cancel-wished-mutation';
import useModalList from '@shared/hooks/use-modal';
import { ModalKey } from '@shared/hooks/use-modal/types';
import { getQueryClient } from '@shared/lib/get-query-client';

interface ToggleWishButtonProps {
  id: number;
  initialIsWished: boolean;
  /**
   * 버튼 너비 : default 42
   */
  width?: number;
  /**
   * 버튼 높이 : default 35
   */
  height?: number;
}

/**
 * 찜 버튼
 */

const ToggleWishButton = ({ id, initialIsWished, width = 42, height = 35 }: ToggleWishButtonProps) => {
  const [isWishedChange, setIsWishedChange] = useState(initialIsWished);
  const { mutate: makeWishedMutate } = usePostMakeWishedMutation();
  const { mutate: cancelWishedMutate } = usePostCancelWishedMutation();
  const { data: userData } = useGetUserInfo();
  const { openModalList, closeModalList } = useModalList();
  const queryClient = getQueryClient();

  const handleClickToggleWishButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const Modal = await import('@shared/ui/modal/confirm-modal-frame').then((module) => module.ConfirmModalFrame);
    const modalKey: ModalKey = ['login-confirm-modal'];

    const handleConfirm = () => {
      closeModalList({ modalKey });
    };

    if (!userData || userData === undefined) {
      // login 상태가 아닐 때 , 로그인 하라는 모달 띄움
      openModalList({
        ModalComponent: Modal,
        modalKey,
        props: {
          modalMessage: <ModalMessage>위시리스트에 담기 위해서는 로그인이 필요합니다</ModalMessage>,
          modalFooter: (
            <ButtonGroup>
              <button type='button' onClick={() => closeModalList({ modalKey })}>
                취소
              </button>
              <Link type='button' href={`/login`} onClick={handleConfirm}>
                로그인하기
              </Link>
            </ButtonGroup>
          ),
        },
      });
    }

    if (!isWishedChange) {
      makeWishedMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['product', id] });
          setIsWishedChange((prev) => !prev);

          return toast.success('위시리스트에 등록되었습니다.');
        },
        onError: (error) => {
          setIsWishedChange(isWishedChange);

          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              return;
            }
          }

          return toast.error('문제가 생겼습니다. 관리자에게 문의하세요.');
        },
      });
    } else {
      cancelWishedMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['product', id] });
          setIsWishedChange((prev) => !prev);

          return toast.success('위시리스트에서 삭제되었습니다.');
        },
        onError: (error) => {
          setIsWishedChange(isWishedChange);
          console.log(error);

          return toast.error('문제가 생겼습니다. 관리자에게 문의하세요.');
        },
      });
    }
  };

  useEffect(() => {
    setIsWishedChange(initialIsWished);
  }, [initialIsWished]);

  return (
    <>
      <button type='button' onClick={handleClickToggleWishButton}>
        {isWishedChange ? (
          <Image src='/images/button/wish-button-on.png' alt='찜하기 취소' width={width} height={height} />
        ) : (
          <Image src='/images/button/wish-button-off.png' alt='찜하기' width={width} height={height} />
        )}
      </button>
    </>
  );
};

export { ToggleWishButton };
