import { ProductConditionValue, ProductInfoEntity } from '../product-api';
import { UserEntity } from '../user-api';

export interface PostOrderResponse {
  /**
   * orderId
   */
  id: number;
  /**
   * 판매자 확인
   */
  seller: {
    id: UserEntity['id'];
    email: UserEntity['email'];
    nickname: UserEntity['nickname'];
    profileImage: UserEntity['profileImage'];
    star: UserEntity['stars'];
    reviewCount: UserEntity['reviewCount'];
  };
  /**
   * 구매자 확인
   */
  buyer: {
    id: UserEntity['id'];
    email: UserEntity['email'];
    nickname: UserEntity['nickname'];
    profileImage: UserEntity['profileImage'];
    star: UserEntity['stars'];
    reviewCount: UserEntity['reviewCount'];
  };
  /**
   * 상품 정보
   */
  product: {
    id: ProductInfoEntity['id'];
    seller: {
      id: UserEntity['id'];
      email: UserEntity['email'];
      nickname: UserEntity['nickname'];
      profileImage: UserEntity['profileImage'];
      star: UserEntity['stars'];
      reviewCount: UserEntity['reviewCount'];
    };
    category: ProductInfoEntity['category'];
    species: ProductInfoEntity['species'];
    condition: ProductConditionValue;
    name: ProductInfoEntity['name'];
    price: ProductInfoEntity['price'];
    content: ProductInfoEntity['content'];
    region: ProductInfoEntity['region'];
    view: ProductInfoEntity['view'];
    status: ProductInfoEntity['status'];
    thumbnailImage: ProductInfoEntity['thumbnailImage'];
    imageUrls: ProductInfoEntity['imageUrls'];
    createAt: ProductInfoEntity['createdAt'];
    wished: boolean;
  };
}

export type CompleteTransactionResponse = boolean;
