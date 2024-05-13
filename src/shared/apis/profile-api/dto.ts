import { UserEntity } from '../user-api';

export interface MyCommunityPostEntity {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  views: number;
  commentCount: number;
  recommendationCount: number;
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

export interface MyProductEntity {
  id: number;
  status: string;
  thumbnailUrl: string;
  price: number;
  name: string;
  createdAt: string;
}

export interface MyProductListEntity {
  content: MyProductEntity[];
}

export interface MyWishProductEntity {
  id: number;
  status: string;
  thumbnailUrl: string;
  price: number;
  name: string;
  createdAt: string;
  wished: boolean;
}

export interface MyWishListEntity {
  content: MyWishProductEntity[];
}

export interface getMyProductListParams {
  page: number;
  size: number;
}
