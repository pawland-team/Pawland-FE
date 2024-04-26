import Image from 'next/image';

import * as S from './search-input-style';

interface SearchInputProps {
  placeholder: string;
  maxWidth?: string;
}

const SearchInput = ({ placeholder, maxWidth = '100%' }: SearchInputProps) => {
  return (
    <>
      <S.SearchInputBox $maxWidth={maxWidth}>
        <Image width={18} height={18} src='/assets/images/icon/search-icon.svg' alt='검색 아이콘' />
        <input type='text' placeholder={placeholder} />
      </S.SearchInputBox>
    </>
  );
};

export { SearchInput };
