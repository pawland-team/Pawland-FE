import * as S from './go-detail-button-style';
import Link from 'next/link';
import Image from 'next/image';

export const GoDetailButton = () => {
  return (
    <Link href='/'>
      <S.GoDetailButton>
        <div>상세보기</div>
        <Image width={6} height={10} src='images/icon/arrow-icon-right.svg' alt='화살표 아이콘' />
      </S.GoDetailButton>
    </Link>
  );
};
