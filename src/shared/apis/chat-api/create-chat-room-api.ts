import { CreateChatRoomRequestDTO } from './dto';
import { clientWithTokenApi } from '../instance';

/**
 * 채팅방 생성
 *
 * - 201 채팅방 생성 성공
 * - 400 잘못된 상품 아이디 혹은 유저 아이디
 * ```
 * {
 *  "message": "잘못된 상품 아이디 혹은 유저 아이디"
 * }
 * ```
 * - 500 서버 내부 오류
 * ```
 * {
 * "message": "서버 내부 오류"
 * }
 * ```
 */
export const createChatRoom = async ({ sellerId, productId, orderId }: CreateChatRoomRequestDTO) => {
  const response = await clientWithTokenApi.post('/api/chat/room', { sellerId, productId, orderId });

  return response;
};
