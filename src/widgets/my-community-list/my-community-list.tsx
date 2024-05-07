import * as S from './my-community-list-style';
import { CommunityPostItem } from '../../entities/community-post-item/user-community-post-item';
import { DropdownButton } from '../../shared/ui/buttons/index';
import { TapMenuBar } from '../tap-menu-bar/tap-menu-bar';

export const MyCommunityList = () => {
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
