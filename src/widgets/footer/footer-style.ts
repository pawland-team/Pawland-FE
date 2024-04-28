import styled from 'styled-components';

export const FooterArea = styled.footer`
  display: block;
  padding: 46px 54px;
  background: #f9f9f9;
`;

export const UpperContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;
  padding: 0 35px 36px;

  border-bottom: 2px solid #c8c8c8;

  .logo-box {
    position: relative;
    width: 279px;
    height: 78px;
  }

  .nav-box {
    display: flex;
    gap: 60px;
    align-items: flex-start;

    h5 {
      margin-bottom: 20px;
      font-size: 2rem;
      font-weight: 700;
      color: #242424;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        a {
          font-size: 1.6rem;
          color: ${({ theme }) => theme.color.gray_9E9E9E};

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

export const LowerContainer = styled.div`
  padding: 36px 35px 0;

  .policy-box {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};

    a {
      & ~ a {
        margin-left: 12px;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      margin-top: 10px;
    }
  }
`;
