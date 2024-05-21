import { ChatContent } from '@shared/apis/chat-api';
import { compareDate } from '@shared/utils/time';

export interface CompareDateAndSenderOfChatResult extends ReturnType<typeof compareDate> {
  isSameSender: boolean;
}

export const compareDateAndSenderOfChat = (
  latestChatContent: ChatContent,
  oldChatContent: ChatContent,
): CompareDateAndSenderOfChatResult => {
  const { messageTime: latestMessageTime, sender: latestMessageSender } = latestChatContent;
  const { messageTime: oldMessageTime, sender: oldMessageSender } = oldChatContent;

  const compareDateResult = compareDate(latestMessageTime, oldMessageTime);

  return {
    ...compareDateResult,
    isSameSender:
      latestMessageSender !== undefined &&
      oldMessageSender !== undefined &&
      Number(latestMessageSender) === Number(oldMessageSender),
  };
};
