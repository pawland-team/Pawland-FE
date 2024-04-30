import { ProductInfoEntity } from '@shared/apis/product-api';
import { UserEntity } from '@shared/apis/user-api';

export type ChatRoomResponse = Array<{
  roomId: number;
  opponentUser: {
    id: UserEntity['id'];
    nickname: UserEntity['nickname'];
    profileImage: UserEntity['profileImage'];
  };
  productInfo: {
    id: ProductInfoEntity['id'];
    seller: Omit<UserEntity, 'email' | 'userIntroduce' | 'stars' | 'loginType'>;
    productName: ProductInfoEntity['productName'];
    price: ProductInfoEntity['price'];
    saleState: ProductInfoEntity['saleState'];
    imageThumbnail: ProductInfoEntity['imageThumbnail'];
    purchaser: number | null;
  };
}>;

type ChatType = 'ENTER' | 'CHAT' | 'PREVIOUS' | 'LEAVE';

interface ChatContent {
  message: string;
  messageId: number;
  messageTime: Date | string;
}

export interface ChatEntity {
  type: ChatType;
  sender: UserEntity['id'];
  content: ChatContent;
}
