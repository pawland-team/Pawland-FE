import { SmallThumbnail } from '../../shared/ui/thumbnails/small-thumbnail/small-thumbnail';
import * as S from './community-post-item-style';
import { formatDateShorter } from '../../shared/utils/time/format-date-shorter/format-date-shorter';
import { GoDetailButton } from '../../features/button/go-detail-button/go-detail-button';
import Link from 'next/link';
import Image from 'next/image';

export const CommunityPostItem = () => {
  return (
    <Link href='/'>
      <S.CommunityPostItem>
        <SmallThumbnail />
        <S.ItemInfoArea>
          <div className='text-area'>
            <h1>뽁뽁이 뼈다귀</h1>
            <p>
              내용은두줄까지만이야냐ㅓ
              ㄹ어로ㅑ오랴나어니이니이너ㅣ어ㅣ너ㅣ러ㅣ아놔와노아ㅗ낭나아ㅗ나ㅗ라ㅗㅇ나ㅗ라ㅗㅇ나너ㅣㅇ나ㅣㅇ댜놰냊대ㅓ내ㅓㅇ니ㅓ이ㅓ니ㅓ아
            </p>
            <div className='value-area'>
              <span className='first-span'>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
              <span>댓글 100</span>
              <span>조회수 100</span>
              <span className='last-span'>찜 100</span>
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
