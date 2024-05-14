import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './user-community-post-item-style';
import { UserCommunityPostEntity } from '@shared/apis/profile-api';

interface UserCommunityPostItemProps {
  item: UserCommunityPostEntity;
}

export const UserCommunityPostItem = ({ item }: UserCommunityPostItemProps) => {
  const [iconSrc, setIconSrc] = useState<string>('/images/icon/arrow-icon-gray.svg');

  return (
    <Link href={`/community/post-detail/${item.id}`}>
      <S.ItemBox
        onMouseEnter={() => setIconSrc('/images/icon/arrow-icon-blue.svg')}
        onMouseLeave={() => setIconSrc('/images/icon/arrow-icon-gray.svg')}
      >
        <S.ThumnailImageWrapper>
          <Image src={item.thumbnail} alt='thumnail-image' fill />
        </S.ThumnailImageWrapper>
        <S.TextContentsWrapper>
          <S.ItemRegiontext>{item.region}</S.ItemRegiontext>
          <S.ItemTitleText>{item.title}</S.ItemTitleText>
          <S.ItemSubTextBox>
            <S.ItemSubText>{item.author.nickname}</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>{item.createdAt}</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>{`댓글 ${item.comments.length}`}</S.ItemSubText>
            <S.ItemSubDivider />
            <S.ItemSubText>{`추천 ${item.recommendCount}`}</S.ItemSubText>
          </S.ItemSubTextBox>
        </S.TextContentsWrapper>
        <S.ArrowIconWrapper>
          <Image src={iconSrc} alt='arrow-icon' fill />
        </S.ArrowIconWrapper>
      </S.ItemBox>
    </Link>
  );
};
