import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './user-community-post-item-style';

export const UserCommunityPostItem = () => {
  const [iconSrc, setIconSrc] = useState<string>('/images/icon/arrow-icon-gray.svg');

  return (
    <Link href='/community/post-detail'>
      <S.ItemBox
        onMouseEnter={() => setIconSrc('/images/icon/arrow-icon-blue.svg')}
        onMouseLeave={() => setIconSrc('/images/icon/arrow-icon-gray.svg')}
      >
        <S.ThumnailImageWrapper>
          <Image src='/images/logo/signature-logo.svg' alt='thumnail-image' fill />
        </S.ThumnailImageWrapper>
        <S.TextContentsWrapper>
          <S.ItemRegiontext>지역</S.ItemRegiontext>
          <S.ItemTitleText>제목제목제목제목제목</S.ItemTitleText>
          <S.ItemSubTextBox>
            <S.ItemSubText>닉네임</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>2024.05.03</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>댓글 100</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>추천 100</S.ItemSubText>
          </S.ItemSubTextBox>
        </S.TextContentsWrapper>
        <S.ArrowIconWrapper>
          <Image src={iconSrc} alt='arrow-icon' fill />
        </S.ArrowIconWrapper>
      </S.ItemBox>
    </Link>
  );
};
