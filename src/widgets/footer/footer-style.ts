import styled from 'styled-components';

export const FooterArea = styled.footer`
  background: #f9f9f9;
  padding: 46px 54px;
  display: block;
`;

export const UpperContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  padding: 0 35px 36px;
  border-bottom: 2px solid #c8c8c8;

  .logo-box {
    width: 279px;
    height: 78px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .nav-box {
    display: flex;
    align-items: flex-start;
    gap: 60px;

    h5 {
      color: #242424;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 20px;
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
    color: ${({ theme }) => theme.color.gray_9E9E9E};
    font-size: 1.6rem;

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
