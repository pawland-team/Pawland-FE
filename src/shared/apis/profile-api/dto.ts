import { ProductListItemDto } from '../product-api';
import { UserEntity } from '../user-api';

export interface MyCommunityPostEntity {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  views: number;
  comments: [];
  commentCount: number;
  recommendCount: number;
  createAt: string;
}

export interface MyCommunityListEntity {
  content: MyCommunityPostEntity[];
}

export type MyCommunityListResponse = Array<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  region: string;
  views: number;
  author: Pick<UserEntity, 'id' | 'email' | 'nickname'>;
  commentCount: number;
}>;

export type MyProductListEntity = ProductListItemDto[];

export interface MyWishProductEntity {
  id: number;
  status: string;
  thumbnailUrl: string;
  price: number;
  name: string;
  createdAt: string;
  wished: boolean;
}

export type MyWishListEntity = ProductListItemDto[];

export interface getMyProductListParams {
  page: number;
  size: number;
  type: string;
}
