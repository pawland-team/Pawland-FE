import { forwardRef } from 'react';

import * as S from './style';

interface ChatDateMessageProps {
  timeDisplayMessage: string;
}

export const ChatDateMessage = forwardRef<HTMLDivElement, ChatDateMessageProps>(
  ({ timeDisplayMessage }, intersectionObserveTargetRef) => {
    return <S.TodayChatDate ref={intersectionObserveTargetRef}>{timeDisplayMessage}</S.TodayChatDate>;
  },
);

ChatDateMessage.displayName = 'ChatDateMessage';
