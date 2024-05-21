import { ChatContent } from '@shared/apis/chat-api';
import { formatToFullDate, formatToMidnightDate } from '@shared/utils/time';

import { processOnDifferentDate } from './process-on-different-date';
import { processOnSameDate_DifferentSender } from './process-on-same-date_different-sender';
import { processOnSameDate_SameSender_DifferentTime } from './process-on-same-date_same-sender_different-time';
import { processOnSameDate_SameSender_SameTime } from './process-on-same-date_same-sender_same-time';
import { processeOnZeroIndex } from './process-on-zero-index';
import { MessageGroupListForDisplay, MessageGroupWithDateTypeForDisplay } from '../../model';
import { compareDateAndSenderOfChat, type CompareDateAndSenderOfChatResult } from '../compare-date-and-sender-of-chat';

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
    currentMessage.sender = Number(currentMessage.sender);
    currentMessage.messageTime = new Date(currentMessage.messageTime);
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
      return processeOnZeroIndex({ currentMessage, messageGroupListForDisplay });
    }

    /**
     * 최신 메시지(previous 이지만 column-reverse여서 0번째 인덱스가 가장 최신 메시지가 됨)
     * - previousMessage: 최신 메시지
     * - currentMessage: previousMessage보다 오래된 메시지
     */
    const previousMessage = messageList[currentIdx - 1];

    const compareDateAndSenderOfChatResult: CompareDateAndSenderOfChatResult = compareDateAndSenderOfChat(
      previousMessage,
      currentMessage,
    );
    const { isDifferentDate, isDifferentTime, isSameSender } = compareDateAndSenderOfChatResult;

    // 기존 리스트의 마지막 그룹을 가져옴
    const lastMessageGroupForDisplay = messageGroupListForDisplay[messageGroupListForDisplay.length - 1];

    if (isDifferentDate) {
      return processOnDifferentDate({
        compareDateAndSenderOfChatResult,
        currentMessage,
        lastMessageGroupForDisplay,
        messageGroupListForDisplay,
      });
    }

    if (!isDifferentDate && !isSameSender) {
      return processOnSameDate_DifferentSender({
        compareDateAndSenderOfChatResult,
        currentMessage,
        lastMessageGroupForDisplay,
        messageGroupListForDisplay,
      });
    }

    if (!isDifferentDate && isSameSender && !isDifferentTime) {
      return processOnSameDate_SameSender_SameTime({
        compareDateAndSenderOfChatResult,
        currentMessage,
        lastMessageGroupForDisplay,
        messageGroupListForDisplay,
      });
    }

    if (!isDifferentDate && isSameSender && isDifferentTime) {
      return processOnSameDate_SameSender_DifferentTime({
        compareDateAndSenderOfChatResult,
        currentMessage,
        lastMessageGroupForDisplay,
        messageGroupListForDisplay,
      });
    }

    return messageGroupListForDisplay;
  }, [] satisfies MessageGroupListForDisplay);
};
