import styled from 'styled-components';

import { inputContainer, inputReset } from '@shared/ui/styles/utills';

interface SearchInputBoxStyle {
  $maxWidth: string;
}

export const SearchInputBox = styled.div<SearchInputBoxStyle>`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.$maxWidth};

  form {
    ${inputContainer}
    gap: 26px;
    padding: 15px 34px;
    border-radius: 37px;
    border: 2px solid ${({ theme }) => theme.color.blue_43ADFF};
  }

  input {
    ${inputReset}
  }
`;
