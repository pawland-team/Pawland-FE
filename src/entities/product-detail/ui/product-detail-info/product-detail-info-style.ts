import styled from 'styled-components';

export const ProductDetailInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  min-height: 540px;
  padding: 42px 44px;

  background-color: ${({ theme }) => theme.color.white_FFFFFF};
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 10px;
`;

export const SubInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MainInfoContainer = styled.div`
  position: relative;

  time {
    font-size: 1.6rem;
    color: #999;
    letter-spacing: -0.04em;
  }

  h2 {
    min-height: 80px;
    margin: 10px 0 20px;

    font-size: 32px;
    font-weight: 600;
    word-break: break-all;
  }

  .seller-info-box {
    display: flex;
    gap: 14px;
    align-items: center;

    a {
      &:hover {
        text-decoration: underline;
      }
    }

    p {
      font-size: 1.6rem;
      color: #999;
    }
  }

  h3 {
    font-size: 40px;
    font-weight: 700;
    text-align: right;
  }
`;

export const DivideLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background-color: #e0e0e0;
`;

export const ButtonContainer = styled.div`
  margin-top: 17px;
`;
