import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';

import { GoDetailButton } from '@features/button/go-detail-button';
import { MyCommunityPostEntity } from '@shared/apis/profile-api';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './community-post-item-style';

interface CommunityPostItemProps {
  item: MyCommunityPostEntity;
}

export const CommunityPostItem = ({ item }: CommunityPostItemProps) => {
  return (
    <Link href={`/community/post-detail/${item.id}`}>
      <S.CommunityPostItem>
        <SmallThumbnail imageUrl={item.thumbnail} />
        <S.ItemInfoArea>
          <div className='text-area'>
            <h1>{item.title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.content, {
                  /**
                   * 렌더 화면에서 금지할 태그
                   */
                  FORBID_TAGS: ['img', 'script', 'iframe', 'video', 'audio', 'link'],
                }),
              }}
            />

            <div className='value-area'>
              <span className='first-span'>{formatDateShorter(item.createdAt)}</span>
              <span>{`댓글 ${item.comments.length} `}</span>
              <span>{`조회수 ${item.views} `}</span>
              <span className='last-span'>{`찜 ${item.recommendCount} `}</span>
            </div>
          </div>
          <div className='button-area'>
            <Link href={`/post-edit/${item.id}`}>
              <Image
                className='edit-button'
                width={24}
                height={24}
                src='images/icon/pencil-icon.svg'
                alt='연필 아이콘'
              />
            </Link>
            <GoDetailButton pageUrl={`/community/post-detail/${item.id}`} />
          </div>
        </S.ItemInfoArea>
      </S.CommunityPostItem>
    </Link>
  );
};
