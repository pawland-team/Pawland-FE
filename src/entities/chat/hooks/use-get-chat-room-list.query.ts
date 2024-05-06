import { useQuery } from '@tanstack/react-query';

import { chatQuery } from '../apis';

export const useGetChatRoomList = () => {
  return useQuery({ ...chatQuery.chatRoomList() });
};
