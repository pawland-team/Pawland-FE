import { ProductInfoEntity } from '@shared/apis/product-api';
import { UserEntity } from '@shared/apis/user-api';
import { ValidDateUtilFuncArgs } from '@shared/interface/time';

export interface WebSocketChatResponse extends StringifiedSenderChatContent {}

export interface CreateChatRoomRequestDTO {
  sellerId: number;
  productId: number;
  orderId: number;
}

export interface StringifiedSenderChatContent {
  sender: string;
  message: string;
  messageId: string;
  messageTime: ValidDateUtilFuncArgs;
}

/**
 * websocket Chat 응답 시
 * http 응답 시
 */
export type HTTPChatResponse = {
  nextCursor: string | null;
  // hasNext: boolean;
  messageList: StringifiedSenderChatContent[];
};

/**
 * Request 때는 messageId가 필요없다.
 */
export interface ChatContent {
  /**
   * user Id
   * 여기서는 number임
   */
  sender: number;
  message: string;
  messageId: string;
  /**
   * 주의할 점: 초기에는 string타입으로 넘어오므로 Date 객체와 비교할 때는 Date 객체로 변환해서 비교해야 함
   */
  messageTime: ValidDateUtilFuncArgs;
  // 나중에 추가(메시지 delete 기능)
  // invisibleTo: string[]; // 유저 아이디 리스트
}

export type ChatRoomListResponse = Array<{
  roomId: number;
  orderId: number;
  opponentUser: Pick<UserEntity, 'id' | 'nickname' | 'profileImage'>;
  productInfo: {
    id: ProductInfoEntity['id'];
    // seller: Omit<UserEntity, 'email' | 'userIntroduce' | 'stars' | 'loginType'>;
    productName: ProductInfoEntity['name'];
    price: ProductInfoEntity['price'];
    saleState: ProductInfoEntity['status']; // ? saleState가 영어임
    thumbnailImage: ProductInfoEntity['thumbnailImage'];
    purchaser: UserEntity['id'] | null;
  };
  lastMessage: ChatContent | null;
}>;

export type ChatType = 'ENTER' | 'CHAT' | 'PREVIOUS' | 'LEAVE';

/**
 * websocket Chat 요청 시
 */
export type ChatRequest = Omit<ChatContent, 'messageId'>;
