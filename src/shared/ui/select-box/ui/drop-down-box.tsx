import { Dispatch, MouseEvent, SetStateAction } from 'react';

import styled from 'styled-components';

import { dropDownMenuStyle } from '../../styles/utills/drop-down-menu';

export interface DropDownBoxDto {
  id: number;
  name: string;
}

interface DropDownBoxProps {
  dropdownList: DropDownBoxDto[];
  selectedName: string;
  setSelectedSortingName: Dispatch<SetStateAction<string | undefined>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const DropDownBox = ({ dropdownList, selectedName, setSelectedSortingName, setIsOpened }: DropDownBoxProps) => {
  const handleClickName = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectedSortingName(target.innerHTML);
    setIsOpened(false);
  };

  return (
    <StyleDropDownBox>
      {dropdownList.map((list) => (
        <li key={list.id}>
          <button onClick={handleClickName} type='button' className={selectedName === list.name ? 'selected' : ''}>
            {list.name}
          </button>
        </li>
      ))}
    </StyleDropDownBox>
  );
};

export { DropDownBox };

const StyleDropDownBox = styled.ul`
  ${dropDownMenuStyle}
  position: absolute;
  top: 100%;
  left: 0;
`;
