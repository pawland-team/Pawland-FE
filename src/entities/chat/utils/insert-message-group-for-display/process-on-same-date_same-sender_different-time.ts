import {
  MessageGroupListForDisplay,
  MessageGroupWithDateTypeForDisplay,
  MessageGroupWithMessageTypeForDisplay,
} from '@entities/chat/model';
import { ChatContent } from '@shared/apis/chat-api';

import { CompareDateAndSenderOfChatResult } from '../compare-date-and-sender-of-chat';

export const processOnSameDate_SameSender_DifferentTime = ({
  messageGroupListForDisplay,
  lastMessageGroupForDisplay,
  currentMessage,
  compareDateAndSenderOfChatResult: { isDifferentDate, isSameSender, isDifferentTime, oldDateInfo },
}: {
  messageGroupListForDisplay: MessageGroupListForDisplay;
  lastMessageGroupForDisplay: MessageGroupWithMessageTypeForDisplay | MessageGroupWithDateTypeForDisplay;
  currentMessage: ChatContent;
  compareDateAndSenderOfChatResult: CompareDateAndSenderOfChatResult;
}): MessageGroupListForDisplay => {
  if (
    !isDifferentDate &&
    isSameSender &&
    isDifferentTime &&
    lastMessageGroupForDisplay.messageGroupType === 'MESSAGE'
  ) {
    // # (Given) 날짜도 같고 sender도 같은데, 시간(hh:mm)이 다른 경우
    // 새로운 그룹을 생성
    // # (When) 이전 그룹이 MESSAGE 타입인 경우
    // [..., (MESSAGE)] => [..., (MESSAGE), (new MESSAGE), (new DATE)]
    messageGroupListForDisplay.push({
      messageGroupType: 'MESSAGE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.dateWithMillisecondsZero,
      messageListInGroup: [currentMessage],
      sender: currentMessage.sender,
    });
    messageGroupListForDisplay.push({
      messageGroupType: 'DATE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.midnightDate,
      timeDisplayMessage: oldDateInfo.fullDateStringWithKoreaStyle,
    });

    return messageGroupListForDisplay;
  }

  if (!isDifferentDate && isSameSender && isDifferentTime && lastMessageGroupForDisplay.messageGroupType === 'DATE') {
    // # (Given) 날짜도 같고 sender도 같은데, 시간(hh:mm)이 다른 경우
    // 새로운 그룹을 생성
    // # (When) 이전 그룹이 DATE 타입인 경우
    // ? 생각을 해봤는데 DATE 타입이 연속적으로 이어지는 경우는 없을 것 같음.(재귀 불필요)
    // 새로운 MESSAGE 타입 그룹을 생성 해서 삽입하고 현재 DATE 타입 그룹을 리스트의 맨 뒤(마지막 인덱스)로 보내야 한다.
    // [..., (MESSAGE), (DATE)] => [..., (MESSAGE), (new MESSAGE), (DATE)]
    messageGroupListForDisplay[messageGroupListForDisplay.length - 1] = {
      messageGroupType: 'MESSAGE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.dateWithMillisecondsZero,
      messageListInGroup: [currentMessage],
      sender: currentMessage.sender,
    };
    messageGroupListForDisplay.push(lastMessageGroupForDisplay);

    return messageGroupListForDisplay;
  }

  return messageGroupListForDisplay;
};
