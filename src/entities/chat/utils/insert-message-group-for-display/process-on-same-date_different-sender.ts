import {
  MessageGroupListForDisplay,
  MessageGroupWithDateTypeForDisplay,
  MessageGroupWithMessageTypeForDisplay,
} from '@entities/chat/model';
import { ChatContent } from '@shared/apis/chat-api';

import { CompareDateAndSenderOfChatResult } from '../compare-date-and-sender-of-chat';

export const processOnSameDate_DifferentSender = ({
  messageGroupListForDisplay,
  lastMessageGroupForDisplay,
  currentMessage,
  compareDateAndSenderOfChatResult: { isDifferentDate, isSameSender, oldDateInfo },
}: {
  messageGroupListForDisplay: MessageGroupListForDisplay;
  lastMessageGroupForDisplay: MessageGroupWithMessageTypeForDisplay | MessageGroupWithDateTypeForDisplay;
  currentMessage: ChatContent;
  compareDateAndSenderOfChatResult: CompareDateAndSenderOfChatResult;
}): MessageGroupListForDisplay => {
  if (!isDifferentDate && !isSameSender && lastMessageGroupForDisplay.messageGroupType === 'MESSAGE') {
    // # (Given) 날짜가 같은 상황
    // 이전 메시지와 현재 메시지의 sender가 같은 경우
    // 이전 메시지와 현재 메시지의 시간의 분 단위 값이 같은 경우
    // -> 분 단위까지의 시간만 비교하면 됨
    // # (Given) 날짜는 같지만, sender가 다른 상황
    // # (When) 마지막 메시지 그룹이 MESSAGE 타입인 경우
    // sender가 다르기 때문에 간격 이격해야 함
    // [..., (MESSAGE)] => [..., (MESSAGE), (new MESSAGE), (new DATE)]
    // * (Then) 새 메시지 그룹 생성 및 추가
    messageGroupListForDisplay.push({
      messageGroupType: 'MESSAGE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.dateWithMillisecondsZero,
      messageListInGroup: [currentMessage],
      sender: currentMessage.sender,
    });
    // * (Then) 새 날짜 메시지 그룹 생성 및 추가
    messageGroupListForDisplay.push({
      messageGroupType: 'DATE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: oldDateInfo.midnightDate,
      timeDisplayMessage: oldDateInfo.fullDateStringWithKoreaStyle,
    });

    return messageGroupListForDisplay;
  }

  if (!isDifferentDate && !isSameSender && lastMessageGroupForDisplay.messageGroupType === 'DATE') {
    // # (Given) 날짜는 같지만, sender가 다르고, 마지막 메시지 그룹이 DATE 타입인 상황
    // [..., (DATE)]
    if (currentMessage.messageTime >= lastMessageGroupForDisplay.messageGroupTime) {
      // # (When) 삽입하려는 메시지의 시간이 마지막 DATE 타입 메시지 그룹의 시간과 같거나 더 최신인 경우
      // [..., (DATE)] => [..., (new MESSAGE), (DATE)]
      // * (Then) 새 메시지 그룹 생성 및 추가
      messageGroupListForDisplay[messageGroupListForDisplay.length - 1] = {
        messageGroupType: 'MESSAGE',
        messageGroupId: crypto.randomUUID(),
        messageGroupTime: oldDateInfo.dateWithMillisecondsZero,
        messageListInGroup: [currentMessage],
        sender: currentMessage.sender,
      };
      // * (Then) 기존 날짜 메시지 그룹을 리스트의 맨 뒤(마지막 인덱스)로 보내야 함.
      messageGroupListForDisplay.push(lastMessageGroupForDisplay);

      return messageGroupListForDisplay;
    }

    if (currentMessage.messageTime < lastMessageGroupForDisplay.messageGroupTime) {
      // ! 날짜가 같기 때문에 이 경우의 수는 사실 있을 수가 없다.
      // ?(When) 삽입하려는 메시지의 시간이 마지막 DATE 타입 메시지 그룹의 시간보다 더 오래된 경우
      // [..., (DATE)] => [..., (DATE), (new MESSAGE), (new DATE)]
      // * (Then) 새 메시지 그룹 생성 및 추가
      messageGroupListForDisplay.push({
        messageGroupType: 'MESSAGE',
        messageGroupId: crypto.randomUUID(),
        messageGroupTime: oldDateInfo.dateWithMillisecondsZero,
        messageListInGroup: [currentMessage],
        sender: currentMessage.sender,
      });
      // * (Then) 새 날짜 메시지 그룹 생성 및 추가
      messageGroupListForDisplay.push({
        messageGroupType: 'DATE',
        messageGroupId: crypto.randomUUID(),
        messageGroupTime: oldDateInfo.midnightDate,
        timeDisplayMessage: oldDateInfo.fullDateStringWithKoreaStyle,
      });

      return messageGroupListForDisplay;
    }
  }

  return messageGroupListForDisplay;
};
