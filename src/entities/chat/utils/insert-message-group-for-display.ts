import { ChatContent } from '@shared/apis/chat-api';
import { formatDateMillisecondsToZero, formatToFullDate, formatToMidnightDate } from '@shared/utils/time';

import { compareDateAndSenderOfChat } from './compare-date-and-sender-of-chat';
import {
  MessageGroupListForDisplay,
  MessageGroupWithDateTypeForDisplay,
  MessageGroupWithMessageTypeForDisplay,
} from '../model';

export const insertMessageGroupForDisplay = ({
  messageList,
}: {
  /**
   * 한 방에 담긴 채팅 리스트
   */
  messageList: ChatContent[];
}): MessageGroupListForDisplay => {
  // 메시지가 없으면 날짜를 보여주는 메시지가 담긴 그룹 생성(reduce 초기값)
  const currentDate = new Date();

  const initialMessageGroupForDisplay: MessageGroupWithDateTypeForDisplay = {
    messageGroupType: 'DATE',
    messageGroupId: crypto.randomUUID(),
    messageGroupTime: formatToMidnightDate(currentDate),
    timeDisplayMessage: formatToFullDate(currentDate),
  };

  if (messageList.length === 0 || !messageList) {
    // # 메시지가 없는 경우
    // 날짜를 보여주는 메시지가 담긴 그룹 생성
    // [(new DATE)]
    return [initialMessageGroupForDisplay] satisfies MessageGroupListForDisplay;
  }

  // messageList length가 1이상인 상황(0 번째 인덱스가 가장 최신 메시지, 마지막 인덱스는 가장 오래된 메시지지)
  return messageList.reduce((messageGroupListForDisplay: MessageGroupListForDisplay, currentMessage, currentIdx) => {
    /**
     * # 그룹이 바뀌는 조건
     *
     * 1. 이전 메시지와 현재 메시지의 날짜가 다른 경우
     *    - 이 경우에는 이전 메시지 그룹과 현재 메시지 그룹의 사이에 날짜를 보여주는 메시지가 담긴 그룹을 삽입
     * 2. 이전 메시지와 현재 메시지의 sender가 다른 경우
     * 3. 이전 메시지와 현재 메시지의 시간의 분 단위 값이 다른 경우
     */

    /**
     * # 같은 그룹이 되기 위해 만족시켜야 하는 조건들
     *
     * 1. 이전 메시지와 현재 메시지의 날짜가 같아야 함
     * 2. 이전 메시지와 현재 메시지의 sender가 같아야 함
     * 3. 이전 메시지와 현재 메시지의 시간의 분 단위 값이 같아야 함
     *    -> 분 단위까지의 시간만 비교하면 됨
     */

    // 앞뒤 아이템 비교해서 날짜가 바뀐 게 확인되면 날짜를 보여주는 메시지가 담긴 그룹을 앞뒤 아이템 사이에 삽입
    if (currentIdx === 0) {
      // # (Given) 첫 번째 메시지인 경우
      // messageList.length === 1인 경우 여기 조건문 돌고 나서 reduce 종료됨.
      // column-reverse로 인해서 0번째 인덱스가 가장 밑으로 갈 최신 메시지가 되어야 함.
      // 이후 날짜 메시지 그룹 생성 및 추가
      // [] => [(new MESSAGE), (new DATE)]

      // * (Then) 새 메시지 그룹 생성 및 추가
      messageGroupListForDisplay.push({
        messageGroupType: 'MESSAGE',
        messageGroupId: crypto.randomUUID(),
        messageGroupTime: formatDateMillisecondsToZero(currentMessage.messageTime),
        messageListInGroup: [currentMessage],
        sender: currentMessage.sender,
      });

      // * (Then) 날짜 메시지 그룹 생성 및 추가
      messageGroupListForDisplay.push({
        messageGroupType: 'DATE',
        messageGroupId: crypto.randomUUID(),
        messageGroupTime: formatToMidnightDate(currentMessage.messageTime),
        timeDisplayMessage: formatToFullDate(currentMessage.messageTime),
      });

      return messageGroupListForDisplay;
    }

    /**
     * 최신 메시지(previous 이지만 column-reverse여서 0번째 인덱스가 가장 최신 메시지가 됨)
     * - previousMessage: 최신 메시지
     * - currentMessage: previousMessage보다 오래된 메시지
     */
    const previousMessage = messageList[currentIdx - 1];

    const { isDifferentDate, isDifferentTime, latestDateInfo, oldDateInfo, isSameSender } = compareDateAndSenderOfChat(
      previousMessage,
      currentMessage,
    );

    // 기존 리스트의 마지막 그룹을 가져옴
    const lastMessageGroupForDisplay = messageGroupListForDisplay[messageGroupListForDisplay.length - 1];

    if (isDifferentDate) {
      // # (Given) 날짜가 다른 상황
      // 날짜가 다르기 때문에 sender가 같을 경우에도 어차피 간격 이격해야 함
      // 중간에 날짜를 보여주는 메시지가 담긴 그룹을 삽입
      // 날짜 메시지 그룹은 단순 디스플레이용임
      // messageGroupListForDisplay return하지 않고 로직 더 진행 ⏬

      if (lastMessageGroupForDisplay.messageGroupType === 'DATE') {
        // ? (When) 마지막 메시지 그룹이 DATE 타입인 경우
        // [(MESSAGE), (DATE)] => [(MESSAGE), (DATE), (new MESSAGE), (new DATE)]

        // * (Then) 새 메시지 그룹 생성 및 추가
        messageGroupListForDisplay.push({
          messageGroupType: 'MESSAGE',
          messageGroupId: crypto.randomUUID(),
          messageGroupTime: latestDateInfo.dateWithMillisecondsZero,
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
      } else {
        // ? (When) 마지막 메시지 그룹이 MESSAGE 타입인 경우
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
      }

      return messageGroupListForDisplay;
    }

    // TODO: else로 바꿔도 될 듯
    if (!isDifferentDate) {
      // # (Given) 날짜가 같은 상황
      // 이전 메시지와 현재 메시지의 sender가 같은 경우
      // 이전 메시지와 현재 메시지의 시간의 분 단위 값이 같은 경우
      // -> 분 단위까지의 시간만 비교하면 됨

      if (!isSameSender) {
        // # (Given) 날짜는 같지만, sender가 다른 상황

        if (lastMessageGroupForDisplay.messageGroupType === 'MESSAGE') {
          // ? (When) 마지막 메시지 그룹이 MESSAGE 타입인 경우
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

        if (lastMessageGroupForDisplay.messageGroupType === 'DATE') {
          // # (Given) 날짜는 같지만, sender가 다르고, 마지막 메시지 그룹이 DATE 타입인 상황
          // [..., (DATE)]
          if (currentMessage.messageTime >= lastMessageGroupForDisplay.messageGroupTime) {
            // ? (When) 삽입하려는 메시지의 시간이 마지막 DATE 타입 메시지 그룹의 시간과 같거나 더 최신인 경우
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
          } else {
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
          }
        }

        return messageGroupListForDisplay;
      }

      if (!isDifferentTime) {
        // # (Given) 날짜도 같고, 시간(hh:mm)도 같고, sender도 같은 상황

        if (lastMessageGroupForDisplay.messageGroupType === 'MESSAGE') {
          // ? (When) messageGroupType이 MESSAGE인 경우
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

        if (lastMessageGroupForDisplay.messageGroupType === 'DATE') {
          // ? (When) messageGroupType이 DATE인 경우
          // [(MESSAGE), (DATE)] => [(MESSAGE, new MESSAGE), (DATE)]

          // * (Then) 현재 메시지(old Message)를 이전 MESSAGE 타입 그룹에 추가
          // 이전 그룹 while 문으로 계속 탐색하면서 해야 할 수도 있을 듯.
          if (messageGroupListForDisplay[messageGroupListForDisplay.length - 2].messageGroupType === 'MESSAGE') {
            (
              messageGroupListForDisplay[messageGroupListForDisplay.length - 2] as MessageGroupWithMessageTypeForDisplay
            ).messageListInGroup.push(currentMessage);
          }
        }

        return messageGroupListForDisplay;
      }

      if (isDifferentTime) {
        // # (Given) 날짜도 같고 sender도 같은데, 시간(hh:mm)이 다른 경우
        // 새로운 그룹을 생성

        if (lastMessageGroupForDisplay.messageGroupType === 'MESSAGE') {
          // ? (When) 이전 그룹이 MESSAGE 타입인 경우
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

        if (lastMessageGroupForDisplay.messageGroupType === 'DATE') {
          // ? (When) 이전 그룹이 DATE 타입인 경우
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

          messageGroupListForDisplay[messageGroupListForDisplay.length] = lastMessageGroupForDisplay;
        }

        return messageGroupListForDisplay;
      }

      return messageGroupListForDisplay;
    }

    return messageGroupListForDisplay;
  }, [] satisfies MessageGroupListForDisplay);
};
