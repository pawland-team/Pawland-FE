import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { UserEntity } from '@shared/apis/user-api';
import { ValidDateUtilFuncArgs } from '@shared/interface/time';
import { RoundProfile } from '@shared/ui/profile/round-profile';
import { formatDateToTimeWithMeridiem, formatToISOString } from '@shared/utils/time';

import * as S from './style';

type OpponentChatMessageProps = {
  opponentUser: Pick<UserEntity, 'id' | 'nickname'> & {
    profileImage: string | StaticImport;
  };
  messageText: string;
  messageTime: ValidDateUtilFuncArgs;
  isFirstIndex: boolean;
  messageGroupTime: ValidDateUtilFuncArgs;
  handleDeleteMessage: () => Promise<void>;
  /**
   * 메시지 그룹의 메시지 리스트에서 가장 마지막 인덱스인지 여부(가장 오래된 메시지인지 여부)
   */
  isOldestMessageInMessageListOfGroup: boolean;
};

export const OpponentChatMessage = ({
  isOldestMessageInMessageListOfGroup,
  opponentUser,
  messageText,
  messageTime,
  isFirstIndex,
  handleDeleteMessage,
  messageGroupTime,
}: OpponentChatMessageProps) => {
  return (
    <S.OpponentMessageArea>
      {
        // 그룹의 가장 오래된 메시지인 경우(인덱스가 messageListInGroup의 마지막 인덱스인 경우) 프로필 사진을 표시한다.
        // indexInMessageList === messageListInGroupLength - 1 ? (
        isOldestMessageInMessageListOfGroup ? (
          // 연속 메시지 오래된 메시지
          <>
            <RoundProfile
              alt='채팅 메시지 발송자 프로필 사진'
              src={opponentUser.profileImage}
              size={{ onDesktop: { width: '68px', height: '68px' } }}
              sizes='68px'
              fill
              priority
            />
            <S.SenderAndMessageBox>
              <S.MessageSender>{opponentUser.nickname}</S.MessageSender>
              <S.MessageLineBox>
                <S.MessageText>{messageText}</S.MessageText>
                <S.MessageTimeAndMeatballs>
                  <S.MessageTime dateTime={formatToISOString(messageTime)} $isFirstIndex={isFirstIndex}>
                    {formatDateToTimeWithMeridiem(messageGroupTime)}
                  </S.MessageTime>
                  <S.MeatballMenuButton aria-label='메시지 컨트롤 버튼' type='button' onClick={handleDeleteMessage}>
                    <S.MeatballMenuIcon />
                  </S.MeatballMenuButton>
                </S.MessageTimeAndMeatballs>
              </S.MessageLineBox>
            </S.SenderAndMessageBox>
          </>
        ) : (
          // 연속 메시지(최신)
          <>
            <S.EmptySpace tabIndex={-1} />
            <S.MessageLineBox>
              <S.MessageText>{messageText}</S.MessageText>
              <S.MessageTimeAndMeatballs>
                <S.MessageTime dateTime={formatToISOString(messageTime)} $isFirstIndex={isFirstIndex}>
                  {formatDateToTimeWithMeridiem(messageTime)}
                </S.MessageTime>
                <S.MeatballMenuButton aria-label='메시지 컨트롤 버튼' type='button' onClick={handleDeleteMessage}>
                  <S.MeatballMenuIcon />
                </S.MeatballMenuButton>
              </S.MessageTimeAndMeatballs>
            </S.MessageLineBox>
          </>
        )
      }
    </S.OpponentMessageArea>
  );
};
