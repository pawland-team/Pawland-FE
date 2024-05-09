import { DropdownButton } from '@shared/ui/buttons';
import { TapMenuBar } from '@widgets/profile-page-tap-menu-bar';

import * as S from './my-community-list-style';
import { useGetmyCommunityList } from '@entities/profile/my-community-post-item/hooks';
import { MyCommunityPostEntity } from '@shared/apis/my-community-api';
import { CommunityPostItem } from '@entities/profile/my-community-post-item/ui';

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
        {listData.map((item) => (
          <CommunityPostItem key={item.id} item={item} />
        ))}
      </S.CommunityList>
    );
  }
};
