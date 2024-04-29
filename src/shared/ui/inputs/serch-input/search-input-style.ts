import styled from 'styled-components';

import { inputContainer, inputReset } from '@shared/ui/styles/utills';

interface SearchInputBoxStyle {
  $maxWidth: string;
}

export const SearchInputBox = styled.div<SearchInputBoxStyle>`
  ${inputContainer}
  border-radius: 37px;

  gap: 26px;

  padding: 15px 34px;

  border: 2px solid ${({ theme }) => theme.color.blue_43ADFF};

  max-width: ${(props) => props.$maxWidth};

  input {
    ${inputReset}
  }
`;
