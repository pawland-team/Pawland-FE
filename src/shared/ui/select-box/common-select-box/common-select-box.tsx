import { Dispatch, SetStateAction, useState } from 'react';

import styled from 'styled-components';

import { DropDownBox, DropDownBoxDto } from '../ui/drop-down-box';
import { SelectBox } from '../ui/select-box';

interface CommonSelectBoxProps {
  selectedName?: string;
  dropdownList: DropDownBoxDto[];
  setSelectedSortingName?: Dispatch<SetStateAction<string | undefined>>;
}

const CommonSelectBox = ({ selectedName, dropdownList, setSelectedSortingName }: CommonSelectBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOpenSelectBox = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <>
      <StyleCommonSelectBox>
        <SelectBox handleClick={handleClickOpenSelectBox} selectedName={selectedName} />
        {isOpened && (
          <DropDownBox
            selectedName={selectedName}
            setSelectedSortingName={setSelectedSortingName}
            dropdownList={dropdownList}
            setIsOpened={setIsOpened}
          />
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
