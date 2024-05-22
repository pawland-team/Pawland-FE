import { ToastContainer } from 'react-toastify';

import styled from 'styled-components';

export const LayoutPage = styled.div`
  padding-top: 80px;

  main {
    min-height: calc(100vh - 80px);
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  /* stylelint-disable-next-line selector-class-pattern */
  .Toastify__toast {
    font-size: 1.6rem;
  }
`;
