import Image from 'next/image';
import Link from 'next/link';

import { GoDetailButton } from '@features/button/go-detail-button';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './community-post-item-style';
import { MyCommunityPostEntity } from '@shared/apis/my-community-api';

interface CommunityPostItemProps {
  item: MyCommunityPostEntity;
}

export const CommunityPostItem = ({ item }: CommunityPostItemProps) => {
  return (
    <Link href='/'>
      <S.CommunityPostItem>
        <SmallThumbnail imageUrl={item.thumbnail} />
        <S.ItemInfoArea>
          <div className='text-area'>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <div className='value-area'>
              <span className='first-span'>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
              <span>{`댓글 ${item.commentCount} `}</span>
              <span>{`조회수 ${item.views} `}</span>
              <span className='last-span'>{`찜 ${item.recommendationCount} `}</span>
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
            <GoDetailButton />
          </div>
        </S.ItemInfoArea>
      </S.CommunityPostItem>
    </Link>
  );
};
