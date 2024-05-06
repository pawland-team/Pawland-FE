import { FormEvent, LegacyRef } from 'react';

import Image from 'next/image';

import * as S from './search-input-style';

interface SearchInputProps {
  placeholder: string;
  maxWidth?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputRef?: LegacyRef<HTMLInputElement>;
}

const SearchInput = ({ handleSubmit, inputRef, placeholder, maxWidth = '100%' }: SearchInputProps) => {
  return (
    <>
      <S.SearchInputBox $maxWidth={maxWidth}>
        <form onSubmit={handleSubmit}>
          <Image width={19} height={19} src='/images/icon/search-icon.svg' alt='검색 아이콘' />
          <input ref={inputRef} type='text' placeholder={placeholder} />
        </form>
      </S.SearchInputBox>
    </>
  );
};

export { SearchInput };
