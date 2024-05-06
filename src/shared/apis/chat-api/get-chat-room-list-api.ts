import { ChatRoomListResponse } from './dto';
import { clientWithTokenApi } from '../instance';

export const getChatRoomList = async () => {
  const response = await clientWithTokenApi.get<ChatRoomListResponse>('/api/chat/rooms');

  return response.data;
};
