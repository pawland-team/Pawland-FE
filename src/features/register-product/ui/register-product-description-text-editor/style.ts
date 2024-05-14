import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  height: fit-content;
`;

export const CategoryHeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const MetaHeader = styled.h2`
  font-size: 2.8rem;
  font-weight: 400;
  line-height: normal;
  color: #222;

  span {
    font-size: 2.8rem;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme: { color } }) => color.blue_43ADFF};
  }
`;

export const MetaDescription = styled.p`
  font-family: Pretendard;
  font-size: 2rem;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  color: #686868;

  span {
    font-size: 1.6rem;
    color: ${({ theme: { color } }) => color.gray_9E9E9E};
  }
`;
