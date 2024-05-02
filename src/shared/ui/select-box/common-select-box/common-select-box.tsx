import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

import styled from 'styled-components';

import { DropDownBox, DropDownBoxDto } from '../ui/drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CommonSelectBoxProps {
  selectedName?: string;
  dropdownList: DropDownBoxDto[];
  setSelectedSortingName?: Dispatch<SetStateAction<string | undefined>>;
}

/**
 *
 * 리스트 클릭했을 때 클릭된 value 값이 보여져야하는 경우 사용.
 * 주로 최신순/인기순 소팅 셀렉트 박스로 활용.
 */

const CommonSelectBox = ({ selectedName, dropdownList, setSelectedSortingName }: CommonSelectBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOpenSelectBox = () => {
    setIsOpened((prev) => !prev);
  };

  const handleClickSelectList = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (setSelectedSortingName) {
      const target = e.target as HTMLButtonElement | HTMLDivElement;
      setSelectedSortingName(target.innerHTML);
      setIsOpened(false);
    }
  };

  return (
    <>
      <StyleCommonSelectBox>
        <SelectBox handleClick={handleClickOpenSelectBox} selectedName={selectedName} isOpened={isOpened} />
        {isOpened && (
          <DropDownBox>
            {dropdownList.map((list) => (
              <li key={list.id}>
                <button
                  type='button'
                  onClick={handleClickSelectList}
                  className={selectedName === list.name ? 'selected' : ''}
                >
                  {list.name}
                </button>
              </li>
            ))}
          </DropDownBox>
        )}
      </StyleCommonSelectBox>
    </>
  );
};

export { CommonSelectBox };

const StyleCommonSelectBox = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
  width: 120px;
`;
