import Link from 'next/link';
import * as S from './review-item-style';
import Image from 'next/image';

export const ReviewItem = () => {
  return (
    <Link href='/'>
      <S.ReviewItem>
        <div>
          <Image
            className='user-profile'
            src='/images/mock/profileImage.png'
            alt='프로필 이미지'
            width={24}
            height={24}
          />
          <span className='nicknamne'>닉네임</span>
          <Image className='check-icon' src='/images/icon/check-icon.svg' alt='프로필 이미지' width={14} height={11} />
        </div>

        <div>별점 영역</div>
        <div className='content'> 잘 쓰겠습니다. 좋은 물건 나눔 감사드려요!</div>
      </S.ReviewItem>
    </Link>
  );
};
