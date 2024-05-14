import { FormEvent, LegacyRef, MouseEvent } from 'react';

import Image from 'next/image';

import * as S from './search-input-style';

interface SearchInputProps {
  placeholder: string;
  maxWidth?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputRef?: LegacyRef<HTMLInputElement>;
  value: string;
  prevValue?: string;
  handleClear: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SearchInput = ({
  handleSubmit,
  inputRef,
  placeholder,
  maxWidth = '100%',
  handleClear,
  value,
  prevValue,
}: SearchInputProps) => {
  return (
    <>
      <S.SearchInputBox $maxWidth={maxWidth}>
        <form onSubmit={handleSubmit}>
          <Image width={19} height={19} src='/images/icon/search-icon.svg' alt='검색 아이콘' />
          {prevValue ? (
            <input ref={inputRef} type='text' placeholder={placeholder} defaultValue={prevValue} />
          ) : (
            <input ref={inputRef} type='text' placeholder={placeholder} />
          )}
          {(value && value.length > 0) ||
            (prevValue && (
              <button onClick={handleClear} type='button'>
                <Image width={19} height={19} src='/images/icon/close-icon.svg' alt='검색 초기화' />
              </button>
            ))}
        </form>
      </S.SearchInputBox>
    </>
  );
};

export { SearchInput };
