import styled from 'styled-components';

import { zIndex } from '../styles/z-index';

const ModalContainer = styled.div`
  position: fixed;
  z-index: ${zIndex.modal};
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 50%);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 340px;
  height: 180px;
  padding: 20px;

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border-radius: 10px;
`;

const ModalContentStyle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 118px;

  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.black_000000};
`;

const ModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 62px;
  padding-top: 20px;

  font-family: Pretendard, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;

  border-top: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;

export { ModalContainer, ModalContent, ModalContentStyle, ModalButton };
