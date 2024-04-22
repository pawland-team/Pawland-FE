import styled from 'styled-components';

import { inputContainer, inputReset } from '@shared/ui/styles/input/input-reset';

export const SearchInputBox = styled.div`
  ${inputContainer}
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid #9e9e9e;

  input {
    ${inputReset}
  }
`;
