import styled from 'styled-components';

export const ItemBox = styled.div`
  cursor: pointer;

  position: relative;

  gap: 20px;

  width: 100%;
  height: 134px;
  padding: 34px 286px 18px 146px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 10px rgb(0 0 0 / 15%);
  }
`;

export const ThumnailImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);

  width: 95px;
  height: 95px;
`;

export const TextContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemRegiontext = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const ItemTitleText = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
`;

export const ItemSubTextBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemSubText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const ItemSubDivider = styled.div`
  width: 1px;
  height: 12px;
  margin: 0 12px;
  border-right: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const ArrowIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  fill: ${({ theme }) => theme.color.black_000000};

  ${ItemBox}:hover & {
    fill: #43adff;
  }
`;
