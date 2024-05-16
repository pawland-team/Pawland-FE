import Image from 'next/image';
import Link from 'next/link';

import * as S from './go-detail-button-style';

interface GoDetailButtonProps {
  pageUrl: string;
}

export const GoDetailButton = ({ pageUrl }: GoDetailButtonProps) => {
  return (
    <Link href={pageUrl}>
      <S.GoDetailButton>
        <div>상세보기</div>
        <Image width={6} height={10} src='images/icon/arrow-icon-right.svg' alt='화살표 아이콘' />
      </S.GoDetailButton>
    </Link>
  );
};
