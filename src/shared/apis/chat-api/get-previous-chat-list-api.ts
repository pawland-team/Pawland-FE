import { ChatRoomListResponse, HTTPChatResponse } from './dto';
import { clientWithTokenApi } from '../instance';

interface GetPreviousChatListParam {
  cursorId?: string | null;
  roomId: ChatRoomListResponse[number]['roomId'];
  signal: AbortSignal;
}

export const getPreviousChatList = async ({ cursorId, roomId, signal }: GetPreviousChatListParam) => {
  const res = await clientWithTokenApi.get<HTTPChatResponse>(`/api/chat/previous/${roomId}`, {
    // `params`은 요청과 함께 전송되는 URL 파라미터입니다.
    // 반드시 일반 객체나 URLSearchParams 객체여야 합니다.
    // 참고: null이나 undefined는 URL에 렌더링되지 않습니다.
    params: {
      messageTime: cursorId,
    },
    signal,
  });

  return res.data;
};
