import { ChatRoomResponse } from './dto';
import { clientWithTokenApi } from '../instance';

export const getChatRoomList = async () => {
  const response = await clientWithTokenApi.get<ChatRoomResponse>('/api/chat/rooms');

  return response.data;
};
