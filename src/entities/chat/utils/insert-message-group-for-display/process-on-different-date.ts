import {
  MessageGroupListForDisplay,
  MessageGroupWithDateTypeForDisplay,
  MessageGroupWithMessageTypeForDisplay,
} from '@entities/chat/model';
import { ChatContent } from '@shared/apis/chat-api';

import { CompareDateAndSenderOfChatResult } from '../compare-date-and-sender-of-chat';

export const processOnDifferentDate = ({
  lastMessageGroupForDisplay,
  messageGroupListForDisplay,
  compareDateAndSenderOfChatResult: { oldDateInfo, latestDateInfo, isDifferentDate },
  currentMessage,
}: {
  lastMessageGroupForDisplay: MessageGroupWithMessageTypeForDisplay | MessageGroupWithDateTypeForDisplay;
  messageGroupListForDisplay: MessageGroupListForDisplay;
  compareDateAndSenderOfChatResult: CompareDateAndSenderOfChatResult;
  currentMessage: ChatContent;
}): MessageGroupListForDisplay => {
  if (isDifferentDate && lastMessageGroupForDisplay.messageGroupType === 'DATE') {
    // # (Given) 날짜가 다른 상황
    // 날짜가 다르기 때문에 sender가 같을 경우에도 어차피 간격 이격해야 함
    // 중간에 날짜를 보여주는 메시지가 담긴 그룹을 삽입
    // 날짜 메시지 그룹은 단순 디스플레이용임 -> 상태관리 배열에 포함하지 않음
    // messageGroupListForDisplay return하지 않고 로직 더 진행 ⏬

    // # (When) 마지막 메시지 그룹이 DATE 타입인 경우
    // [(MESSAGE), (DATE)] => [(MESSAGE), (DATE), (new MESSAGE), (new DATE)]

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

  if (isDifferentDate && lastMessageGroupForDisplay.messageGroupType === 'MESSAGE') {
    // # (Given) 날짜가 다른 상황
    // 날짜가 다르기 때문에 sender가 같을 경우에도 어차피 간격 이격해야 함
    // 중간에 날짜를 보여주는 메시지가 담긴 그룹을 삽입
    // 날짜 메시지 그룹은 단순 디스플레이용임 -> 상태관리 배열에 포함하지 않음
    // messageGroupListForDisplay return하지 않고 로직 더 진행 ⏬

    // # (When) 마지막 메시지 그룹이 MESSAGE 타입인 경우
    // [(MESSAGE), (MESSAGE)] => [(MESSAGE), (MESSAGE), (new DATE), (new MESSAGE), (new DATE)]

    // * (Then) 새 날짜 메시지 그룹 생성 및 추가
    messageGroupListForDisplay.push({
      messageGroupType: 'DATE',
      messageGroupId: crypto.randomUUID(),
      messageGroupTime: latestDateInfo.midnightDate,
      timeDisplayMessage: latestDateInfo.fullDateStringWithKoreaStyle,
    });
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

  return messageGroupListForDisplay;
};
