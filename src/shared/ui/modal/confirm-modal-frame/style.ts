import { styled } from 'styled-components';

export const Dimmed = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.modal};
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  /* opacity: 0.6; */

  /* background: #202020; */
  background: rgb(32 32 32 / 60%);
`;

export const Container = styled.div`
  overflow: hidden;
  flex-shrink: 0;

  width: 340px;
  height: 180px;

  background: ${({ theme: { color } }) => color.white_FFFFFF};
  border-radius: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 100%;
  height: 118px;
`;

export const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  height: 62px;
`;
