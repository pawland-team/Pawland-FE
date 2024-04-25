import * as S from './search-input-style';

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <>
      <S.SearchInputBox>
        <img src='/assets/images/icon/search-icon.svg' alt='검색 아이콘' />
        <input type='text' placeholder={placeholder} />
      </S.SearchInputBox>
    </>
  );
};

export { SearchInput };
