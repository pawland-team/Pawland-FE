import styled from 'styled-components';

export const FunnelArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.header.web});

  .funnel-container {
    width: 100%;
    max-width: 980px;
    text-align: center;
  }

  .funnel-title-box {
    margin-bottom: 40px;

    h2 {
      margin-bottom: 24px;
      font-size: 32px;
      font-weight: 600;
    }

    p {
      font-size: 18px;
    }
  }

  .funnel-button-box {
    max-width: 600px;
    margin: 0 auto;
  }

  .funnel-button-group {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;

    max-width: 600px;
    margin: 0 auto;
  }
`;
