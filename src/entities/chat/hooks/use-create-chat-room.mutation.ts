import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createChatRoom } from '@shared/apis/chat-api';

import { chatQueryKeys } from '../apis';

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.chatRoomList() });
    },
  });
};
