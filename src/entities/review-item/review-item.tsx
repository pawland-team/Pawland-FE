import * as S from './review-item-style';

import Link from '../../../node_modules/next/link';
import Image from '../../../node_modules/next/image';

export const ReviewItem = () => {
  return (
    <Link href='/'>
      <S.ReviewItem>
        <div>
          <Image
            className='userProfile'
            src='/images/mock/profileImage.png'
            alt='프로필 이미지'
            width={24}
            height={24}
          />
          <span className='nickNamne'>닉네임</span>
          <Image className='checkIcon' src='/images/icon/check-icon.svg' alt='프로필 이미지' width={14} height={11} />
        </div>

        <div>별점 영역</div>
        <div className='content'> 잘 쓰겠습니다. 좋은 물건 나눔 감사드려요!</div>
      </S.ReviewItem>
    </Link>
  );
};