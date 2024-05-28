import { ToastContainer } from 'react-toastify';

import styled from 'styled-components';

export const LayoutPage = styled.div`
  padding-top: ${({ theme }) => theme.header.web};

  main {
    min-height: calc(100vh - ${({ theme }) => theme.header.web});
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  /* stylelint-disable-next-line selector-class-pattern */
  .Toastify__toast {
    font-size: 1.6rem;
  }
`;
