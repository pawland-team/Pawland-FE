import { MessageGroupListForDisplay } from '@entities/chat/model';
import { ChatContent } from '@shared/apis/chat-api';
import { formatDateMillisecondsToZero, formatToFullDate, formatToMidnightDate } from '@shared/utils/time';

export const processeOnZeroIndex = ({
  messageGroupListForDisplay,
  currentMessage,
}: {
  messageGroupListForDisplay: MessageGroupListForDisplay;
  currentMessage: ChatContent;
}): MessageGroupListForDisplay => {
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
};
