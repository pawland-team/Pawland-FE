import { useInfiniteQuery } from '@tanstack/react-query';

import { chatQuery } from '../apis';
import { RoomInfo } from '../model';

interface UseGetPreviousChatListParam {
  roomId?: RoomInfo['roomId'];
}

export const useGetPreviousChatList = ({ roomId }: UseGetPreviousChatListParam) => {
  return useInfiniteQuery({ ...chatQuery.previousChatList({ roomId }) });
};
