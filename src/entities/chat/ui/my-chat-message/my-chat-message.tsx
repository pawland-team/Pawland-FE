import { ValidDateUtilFuncArgs } from '@shared/interface/time';
import { formatDateToTimeWithMeridiem, formatToISOString } from '@shared/utils/time';

import * as S from './style';

interface ChatMessageGroup {
  handleDeleteMessage: () => Promise<void>;
  messageTime: ValidDateUtilFuncArgs;
  messageGroupTime: ValidDateUtilFuncArgs;
  isFirstIndex: boolean;
  messageText: string;
}

export const MyChatMessage = ({
  handleDeleteMessage,
  isFirstIndex,
  messageGroupTime,
  messageTime,
  messageText,
}: ChatMessageGroup) => {
  return (
    <S.MyMessageArea>
      <S.MessageLineBox>
        <S.MessageTimeAndMeatballs>
          <S.MeatballMenuButton aria-label='메시지 컨트롤 버튼' type='button' onClick={handleDeleteMessage}>
            <S.MeatballMenuIcon />
          </S.MeatballMenuButton>
          <S.MessageTime dateTime={formatToISOString(messageTime)} $isFirstIndex={isFirstIndex}>
            {formatDateToTimeWithMeridiem(messageGroupTime)}
          </S.MessageTime>
        </S.MessageTimeAndMeatballs>
        <S.MessageText>{messageText}</S.MessageText>
      </S.MessageLineBox>
    </S.MyMessageArea>
  );
};
