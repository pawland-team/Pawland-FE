import {
  MessageGroupListForDisplay,
  MessageGroupWithDateTypeForDisplay,
  MessageGroupWithMessageTypeForDisplay,
} from '@entities/chat/model';
import { ChatContent } from '@shared/apis/chat-api';

import { CompareDateAndSenderOfChatResult } from '../compare-date-and-sender-of-chat';

export const processOnSameDate_SameSender_SameTime = ({
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
    !isDifferentTime &&
    lastMessageGroupForDisplay.messageGroupType === 'MESSAGE'
  ) {
    // # (Given) 날짜도 같고, 시간(hh:mm)도 같고, sender도 같은 상황
    // # (When) messageGroupType이 MESSAGE인 경우
    // [(MESSAGE), (MESSAGE)] => [(MESSAGE), (MESSAGE, new MESSAGE), (new DATE)]

    // * (Then) 마지막 그룹에 메시지 추가
    lastMessageGroupForDisplay.messageListInGroup.push(currentMessage);
    // * (Then) 날짜 메시지 그룹 생성 및 추가
    messageGroupListForDisplay.push({
      messageGroupType: 'DATE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.midnightDate,
      timeDisplayMessage: oldDateInfo.fullDateStringWithKoreaStyle,
    });

    return messageGroupListForDisplay;
  }

  if (!isDifferentDate && isSameSender && !isDifferentTime && lastMessageGroupForDisplay.messageGroupType === 'DATE') {
    // # (Given) 날짜도 같고, 시간(hh:mm)도 같고, sender도 같은 상황
    // # (When) messageGroupType이 DATE인 경우
    // [(MESSAGE), (DATE)] => [(MESSAGE, new MESSAGE), (DATE)]
    // * (Then) 현재 메시지(old Message)를 이전 MESSAGE 타입 그룹에 추가
    // 이전 그룹 while 문으로 계속 탐색하면서 해야 할 수도 있을 듯.
    const twoStepPreviousGroup = messageGroupListForDisplay[messageGroupListForDisplay.length - 2];

    if (twoStepPreviousGroup.messageGroupType === 'MESSAGE') {
      twoStepPreviousGroup.messageListInGroup.push(currentMessage);
    }

    return messageGroupListForDisplay;
  }

  return messageGroupListForDisplay;
};
