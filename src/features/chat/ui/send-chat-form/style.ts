import styled from 'styled-components';

import { CHAT_TEXTAREA_SIZE } from '@entities/chat/constants/style';

import AirPlane from '@/public/images/icon/paper-airplane-unfilled-w24-h24.svg?component';

export const ChatRoomFooter = styled.div<{ $textAreaChangedHeight: number }>`
  position: absolute;
  bottom: 0;

  flex-shrink: 0;

  width: 100%;
  height: ${({ $textAreaChangedHeight }) => `calc(${$textAreaChangedHeight}px + 88px)`};

  /* height: fit-content; */

  min-height: fit-content;

  /* min-height: 88px; */
  max-height: 220px;
  padding: 16px 22px 20px 23px;

  background-color: ${({ theme: { color } }) => color.white_FFFFFF};
  border-top: 2px solid ${({ theme: { color } }) => color.gray_F3F3F3};
`;

export const ChatForm = styled.form<{ $textAreaChangedHeight: number }>`
  display: flex;
  column-gap: 11px; /* 디자인 수정 4px -> 11px */
  align-items: center;

  width: 100%;

  /* 입력값 없을 때 높이 */
  height: ${({ $textAreaChangedHeight }) => `calc(${$textAreaChangedHeight}px + 52px)`};

  /* height: fit-content; */

  min-height: fit-content;

  /* min-height: 52px; */
  max-height: 183px;
  padding: 12px 25px 12px 35px;

  border: 1px solid ${({ theme: { color } }) => color.gray_9E9E9E};
  border-radius: 36px;
`;

export const ChatTextArea = styled.textarea<{ $textAreaCurrentHeight: number }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 438px; /* 디자인 수정 450px -> 438px */
  height: ${CHAT_TEXTAREA_SIZE.onDesktop.height}px;
  min-height: ${CHAT_TEXTAREA_SIZE.onDesktop.minHeight}px;

  /* max-height: 100%; */
  max-height: ${CHAT_TEXTAREA_SIZE.onDesktop.maxHeight}px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.8rem; /* 175% */

  /* line-height: 28px; */
  letter-spacing: -0.06rem;
  vertical-align: middle;

  &::placeholder {
    color: ${({ theme: { color } }) => color.gray_9E9E9E};
  }

  &::-webkit-scrollbar {
    display: ${({ $textAreaCurrentHeight }) => $textAreaCurrentHeight < 140 && 'none'};
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(158 158 158 / 100%);
    border-radius: 18px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(243 243 243 / 100%);
    border-radius: 18px;
  }
`;

export const ChatSendButtonContainer = styled.div`
  display: flex;
  flex-shrink: 0;

  width: 24px;
  height: 100%;
  min-height: 28px; /* 24px(button) + 4px(padding-top) */
`;

export const ChatSendButton = styled.button`
  position: relative;

  flex-shrink: 0;
  align-self: flex-end;

  width: 24px;
  height: 24px;
`;

export const AirplaneIcon = styled(AirPlane)`
  width: 100%;
  max-width: 100%;
  height: 100%;

  object-fit: cover;

  fill: ${({ theme: { color } }) => color.gray_9E9E9E};
`;
