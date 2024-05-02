import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';

import styled from 'styled-components';

import { useOutsideClick } from '@shared/hooks/use-outside-click';

import { DropDownBox, DropDownBoxDto } from '../ui/drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CommonSelectBoxProps {
  selectedName?: string;
  dropdownList: DropDownBoxDto[];
  setSelectedSortingName?: Dispatch<SetStateAction<string | undefined>>;
}

/**
 *
 * - 리스트 클릭했을 때 클릭된 value 값이 보여져야하는 경우 사용.
 * - 주로 최신순/인기순 소팅 셀렉트 박스로 활용. (예시는 상품 리스트에서 확인)
 */

const CommonSelectBox = ({ selectedName, dropdownList, setSelectedSortingName }: CommonSelectBoxProps) => {
  const dropDownRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  useOutsideClick(dropDownRef, isOpened, setIsOpened);

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
      <StyleCommonSelectBox ref={dropDownRef}>
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
