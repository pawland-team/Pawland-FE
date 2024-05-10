import Image from 'next/image';
import Link from 'next/link';

import { GoDetailButton } from '@features/button/go-detail-button';
<<<<<<<< HEAD:src/entities/profile/ui/my-community-post-item/community-post-item.tsx
import { MyCommunityPostEntity } from '@shared/apis/profile-api';
========
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/my-community-post-item/ui/community-post-item.tsx
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './community-post-item-style';
<<<<<<<< HEAD:src/entities/profile/ui/my-community-post-item/community-post-item.tsx
========
import { MyCommunityPostEntity } from '@shared/apis/my-community-api';
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/my-community-post-item/ui/community-post-item.tsx

interface CommunityPostItemProps {
  item: MyCommunityPostEntity;
}

export const CommunityPostItem = ({ item }: CommunityPostItemProps) => {
  return (
<<<<<<<< HEAD:src/entities/profile/ui/my-community-post-item/community-post-item.tsx
    <Link href={`/community/post-detail/${item.id}`}>
========
    <Link href='/'>
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/my-community-post-item/ui/community-post-item.tsx
      <S.CommunityPostItem>
        <SmallThumbnail imageUrl={item.thumbnail} />
        <S.ItemInfoArea>
          <div className='text-area'>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <div className='value-area'>
<<<<<<<< HEAD:src/entities/profile/ui/my-community-post-item/community-post-item.tsx
              <span className='first-span'>{formatDateShorter(item.createdAt)}</span>
              <span>{`댓글 ${item.comments.length} `}</span>
              <span>{`조회수 ${item.views} `}</span>
              <span className='last-span'>{`찜 ${item.recommendCount} `}</span>
========
              <span className='first-span'>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
              <span>{`댓글 ${item.commentCount} `}</span>
              <span>{`조회수 ${item.views} `}</span>
              <span className='last-span'>{`찜 ${item.recommendationCount} `}</span>
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/my-community-post-item/ui/community-post-item.tsx
            </div>
          </div>
          <div className='button-area'>
            <Link href='/'>
              <Image
                className='edit-button'
                width={24}
                height={24}
                src='images/icon/pencil-icon.svg'
                alt='연필 아이콘'
              />
            </Link>
<<<<<<<< HEAD:src/entities/profile/ui/my-community-post-item/community-post-item.tsx
            <GoDetailButton pageUrl={`/community/post-detail/${item.id}`} />
========
            <GoDetailButton />
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/my-community-post-item/ui/community-post-item.tsx
          </div>
        </S.ItemInfoArea>
      </S.CommunityPostItem>
    </Link>
  );
};
