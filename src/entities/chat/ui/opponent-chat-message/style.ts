import { styled } from 'styled-components';

import { messageMaxWidthWithController } from '@entities/chat/constants/style';

export * from '../my-chat-message/style';

export const OpponentMessageArea = styled.div`
  display: flex;
  column-gap: 8px;
  align-self: flex-start;
  height: fit-content;
`;

export const SenderAndMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: ${({
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
  padding-top: 4px;
`;

export const MessageSender = styled.div`
  overflow: hidden;

  width: fit-content;
  max-width: 100%;
  height: 24px;

  font-family: Pretendard, sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem; /* 171.429% */
  color: ${({ theme: { color } }) => color.gray_9E9E9E};
  text-overflow: ellipsis;
  letter-spacing: -0.06rem;
  white-space: nowrap;
`;

export const EmptySpace = styled.div`
  width: 68px;
  visibility: hidden;
`;
