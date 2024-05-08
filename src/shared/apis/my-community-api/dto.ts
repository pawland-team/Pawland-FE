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
