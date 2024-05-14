import { useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

import { ModalComponentProps } from '@shared/hooks/use-modal';

interface NormalSnackBarProps {
  message: string;
  backgroundColor?: string;
  /**
   * ms 단위
   */
  duration?: number;
}

/**
 * #### useModalWithLocalState hook으로 제어한다.
 *
 * - openModal의 `persist` option을 `true`로 줘서 snackbar의 바깥 영역을 눌렀을 때 닫히는 것을 막아야 한다.
 * - `duration`이 지나면 자동으로 닫힌다.
 * - `duration`의 90% 지난 시점에 닫히는 애니메이션을 보여준다.
 *
 * @example
 * ```tsx
 * const { ModalComponent, openModal, isModalOpen, ...rest } = useModalWithLocalState(); // 👈 step 1
 *
 * openModal({
 *   ModalComponent: NormalSnackBar, // 👈 step 2
 *   props: { message: '파일 크기는 10MB까지만 가능합니다.' },
 *   options: {
 *     persist: true, // 👈 step 3
 *   },
 * });
 *
 * return (
 *  <>
 *     {isModalOpen && <ModalComponent /> } // 👈 step 4
 *     ...
 *  </>
 * );
 * ```
 */
export const NormalSnackBar = ({
  message,
  backgroundColor = 'rgb(245, 81, 29)',
  duration = 3000,
  closeModal,
}: ModalComponentProps<NormalSnackBarProps>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, duration * 0.9);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, closeModal]);

  return (
    <SnackbarWrapper $duration={duration} $backgroundColor={backgroundColor}>
      {message}
    </SnackbarWrapper>
  );
};

const fadeInAndOut = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(20px);
    opacity: 1;
  }

  70% {
    transform: translateY(20px);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const SnackbarWrapper = styled.div<{ $backgroundColor: string; $duration: number }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  padding: 10px 20px;

  font-size: 1.5rem;
  color: white;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);

  transition: opacity 0.5s ease;
  animation: ${fadeInAndOut} ${({ $duration }) => $duration}ms ease;
`;
