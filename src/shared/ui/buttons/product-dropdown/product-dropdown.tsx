import { useState } from 'react';

import Image from 'next/image';

import * as S from './product-dropdown-style';
import { useDropdownStore } from '@shared/store/use-drop-down-store';

interface DropdownButtonProps {
  dropdownItems: string[];
  lastDropdownItem: string;
  iconPath: string;
  width?: string;
  buttonHeight?: string;
  borderColor?: string;
  fontColor?: string;
  selectedFontSize?: string;
}

const ProductDropdownButton = ({
  dropdownItems,
  lastDropdownItem,
  iconPath = 'images/icon/arrow-down-icon-gray.svg',
  width = '120px',
  buttonHeight = '36px',
  borderColor = '#9E9E9E',
  fontColor = '#9E9E9E',
  selectedFontSize = '1.6rem',
}: DropdownButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedMenu = useDropdownStore((state) => state.selectedMenu);
  const setSelectedMenu = useDropdownStore((state) => state.setSelectedMenu);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (item: string) => {
    setSelectedMenu(item);
    setIsDropdownOpen(false);
  };

  return (
    <S.DropdownButton
      $width={width}
      $buttonHeight={buttonHeight}
      $borderColor={borderColor}
      $fontColor={fontColor}
      onClick={(e) => {
        e.preventDefault();
        toggleDropdown();
      }}
    >
      <S.SelectedMenu $selectedFontSize={selectedFontSize}>{selectedMenu}</S.SelectedMenu>
      <Image width={13} height={13} src={iconPath} alt='화살표 아이콘' />
      {isDropdownOpen && (
        <S.DropdownMenuList $width={width} $borderColor={borderColor}>
          {dropdownItems.map((item) => (
            <S.DropdownMenu key={item} onClick={() => handleMenuClick(item)} $borderColor={borderColor}>
              {item}
            </S.DropdownMenu>
          ))}
          <S.LastDropdownMenu onClick={() => handleMenuClick(lastDropdownItem)}>{lastDropdownItem}</S.LastDropdownMenu>
        </S.DropdownMenuList>
      )}
    </S.DropdownButton>
  );
};

export { ProductDropdownButton };
