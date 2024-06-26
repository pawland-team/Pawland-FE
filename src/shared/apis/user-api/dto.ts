export interface UserEntity {
  /**
   * user Id
   */
  id: number;
  profileImage: string;
  nickname: string;
  email: string;
  userDesc: string;

  /**
   * 판매자에 대한 별점 평균.
   * 초기값은 0
   * 최소 1점, 최대 5점
   * 0이면 아직 리뷰가 없는 상태
   */
  stars: number;
  loginType: string;
  reviewCount: number;
}

export interface GetUserInfoResponse {
  id: UserEntity['id'];
  profileImage: UserEntity['profileImage'];
  nickname: UserEntity['nickname'];
  email: UserEntity['email'];
  /**
   * TODO: UserEntity에 적힌 userIntroduce랑 필드명이 다름.
   */
  userDesc: UserEntity['userDesc'];
  stars: UserEntity['stars'];
  loginType: UserEntity['loginType'];
  reviewCount: UserEntity['reviewCount'];
}

export interface getUserProductListParams {
  size: number;
  userId: number;
}

export interface getUserReviewListParams {
  page: number;
  size: number;
  userId: number;
}

export interface getUserCommunityListParams {
  page: number;
  userId: number;
}

export interface UserReviewEntity {
  reviewId: number;
  reviewerId: number;
  reviewerNickName: string;
  reviewerProfileImage: string;
  star: number;
  content: string;
  createAt: string;
}

export type UserReviewListEntity = {
  content: UserReviewEntity[];
  totalPages: number;
};
