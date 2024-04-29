import { TapMenuBar } from '../tap-menu-bar/tap-menu-bar';
import { DropdownButton } from '../../shared/ui/buttons/index';
import * as S from './community-list-style';

export const CommunityList = () => {
  return (
    <S.CommunityList>
      <div className='buttonArea'>
        <TapMenuBar />
        <DropdownButton dropdownItems={['전체보기', '최신순']} lastDropdownItem={'인기순'} />
      </div>
    </S.CommunityList>
  );
};
