type LoginType = '구글' | '네이버' | '카카오' | '일반';

export interface UserEntity {
  /**
   * user Id
   */
  id: number;
  profileImage: string | null;
  nickname: string;
  email: string;
  userIntroduce: string;
  /**
   * 판매자에 대한 별점 평균.
   * 초기값은 0
   * 최소 1점, 최대 5점
   * 0이면 아직 리뷰가 없는 상태
   */
  stars: number;
  loginType: LoginType;
}
