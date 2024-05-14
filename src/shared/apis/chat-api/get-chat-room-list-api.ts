import { ChatRoomListResponse } from './dto';
import { clientWithTokenApi } from '../instance';

export const getChatRoomList = async () => {
  const response = await clientWithTokenApi.get<ChatRoomListResponse>('/api/chat/room');

  return response.data;
};
