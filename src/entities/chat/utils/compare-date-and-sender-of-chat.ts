import { ChatContent } from '@shared/apis/chat-api';
import { compareDate } from '@shared/utils/time';

interface CompareDateAndSenderOfChatResult extends ReturnType<typeof compareDate> {
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
      latestMessageSender !== undefined && oldMessageSender !== undefined && latestMessageSender === oldMessageSender,
  };
};
