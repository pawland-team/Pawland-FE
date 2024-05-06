import styled from 'styled-components';

import { DivideLineBDBDBD } from '@shared/ui/styles/utills/divide-line';

export const MainInfoSection = styled.section`
  margin-bottom: 80px;

  .info-container {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .content-container {
    font-size: 1.6rem;
  }
`;

export const DivideLine = styled.div`
  ${DivideLineBDBDBD}
  margin: 77px 0;
`;
