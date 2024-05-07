import { CommunityPostItem } from '@entities/community-post-item';
import { DropdownButton } from '@shared/ui/buttons';
import { TapMenuBar } from '@widgets/tap-menu-bar';

import * as S from './community-list-style';

export const CommunityList = () => {
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
      <CommunityPostItem />
      <CommunityPostItem />
      <CommunityPostItem />
      <CommunityPostItem />
    </S.CommunityList>
  );
};
