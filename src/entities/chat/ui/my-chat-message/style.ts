import styled from 'styled-components';

import { messageMaxWidth, messageMaxWidthWithController } from '@entities/chat/constants/style';

// Gray-9E9E9E
import MeatballsMenu from '@/public/images/icon/meatballs-menu-filled-9E9E9E-w24-h24.svg?component';

export const MyMessageArea = styled.div`
  display: flex;
  column-gap: 8px;
  align-self: flex-end;
`;

// 점박이까지 계산
/* 362/583 * 100 = 62.0926... */

// 채팅 메시지 박스까지만 계산
/* 275/583 * 100 = 47.169811320754716981132075471698; */

export const MeatballMenuButton = styled.button`
  cursor: pointer;

  flex-shrink: 0;

  width: 24px;
  height: 24px;

  visibility: hidden;
`;

export const MeatballMenuIcon = styled(MeatballsMenu)`
  width: 100%;
  max-width: 100%;
  height: 100%;
`;

export const MessageTime = styled.time<{ dateTime: Date | string; $isFirstIndex: boolean }>`
  user-select: none;

  flex-shrink: 0;

  /* width: 48px; */

  font-family: Pretendard, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem; /* 150% */
  color: ${({ theme }) => theme.color.gray_9E9E9E};
  letter-spacing: -0.06rem;

  visibility: ${({ $isFirstIndex }) => ($isFirstIndex ? 'visible' : 'hidden')};
`;

export const MessageLineBox = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: flex-end;

  width: fit-content;
  max-width: ${({
    theme: {
      blockSize: {
        chatRoom: {
          onDesktop: { width },
        },
      },
    },
    // eslint rule 때문에 parseInt 사용
  }) => {
    const w = parseInt(width.replace('px', ''), 10);

    return `${w * Number(messageMaxWidthWithController / w)}px`;
  }};

  &:hover :where(${MeatballMenuButton}, ${MessageTime}) {
    visibility: visible;
  }
`;

export const MessageTimeAndMeatballs = styled.div`
  display: flex;
  flex-shrink: 0;
  column-gap: 7px;
  align-items: center;

  width: 79px;
  height: 24px;
`;

export const MessageText = styled.pre`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: fit-content;
  max-width: ${({
    theme: {
      blockSize: {
        chatRoom: {
          onDesktop: { width },
        },
      },
    },
    // eslint rule 때문에 parseInt 사용
  }) => {
    const w = parseInt(width.replace('px', ''), 10);

    return `${w * Number(messageMaxWidth / w)}px`;
  }};
  height: fit-content;
  padding: 6px 20px;

  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.8rem; /* 175% */
  color: ${({ theme: { color } }) => color.white_FFFFFF};
  letter-spacing: -0.06rem;
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */

  background: ${({ theme }) => theme.color.blue_2087D6};
  border-radius: 22px;
`;
