import { clientWithTokenApi } from '../instance';
import { ChatRoomResponse } from './dto';

export const getChatRoomList = async () => {
  const response = await clientWithTokenApi.get<ChatRoomResponse>('/api/chat/rooms');

  return response.data;
};
