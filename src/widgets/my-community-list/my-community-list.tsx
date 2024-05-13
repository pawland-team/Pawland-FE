import { DropdownButton } from '@shared/ui/buttons';
import { TapMenuBar } from '@widgets/profile-page-tap-menu-bar';

import * as S from './my-community-list-style';
import { useGetmyCommunityList } from '@entities/profile/hooks';
import { MyCommunityPostEntity } from '@shared/apis/profile-api';
import { CommunityPostItem } from '@entities/profile/ui/my-community-post-item';
import { NoProductBox } from '@shared/ui/error';

export const MyCommunityList = () => {
  const { data, status } = useGetmyCommunityList(1);

  if (status === 'success') {
    const listData: MyCommunityPostEntity[] = data?.content;

    return (
      <S.CommunityList>
        <div className='button-area'>
          <TapMenuBar />
          <DropdownButton
            dropdownItems={['전체보기', '최신순']}
            lastDropdownItem={'인기순'}
            defaultMenu={'전체보기'}
            iconPath={'images/icon/arrow-down-icon-gray.svg'}
          />
        </div>
        {data?.content.length === 0 && <NoProductBox />}

        {listData.map((item) => (
          <CommunityPostItem key={item.id} item={item} />
        ))}
      </S.CommunityList>
    );
  }
};
