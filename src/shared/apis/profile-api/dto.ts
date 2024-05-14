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
  createdAt: string;
  region: string;
}

export interface MyCommunityListEntity {
  content: MyCommunityPostEntity[];
}

type Author = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  star?: number;
  reviewCount?: number;
};

type Comment = {
  id: number;
  author: Author;
  content: string;
  recommendCount: number;
  createdAt: string;
};

export interface UserCommunityPostEntity {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  region: string;
  views: number;
  author: Author;
  comments: Comment[];
  createdAt: string;
  recommendCount: number;
  recommended: boolean;
}

export type UserCommunityListEntity = UserCommunityPostEntity[];

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
