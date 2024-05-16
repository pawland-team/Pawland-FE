import Image from 'next/image';
import styled from 'styled-components';

export const RegisteredProductItem = styled.div`
  cursor: pointer;

  position: relative;

  display: flex;

  width: 100%;
  padding: 20px 26px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const DropDownArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 14px;
  margin-left: 27px;
`;

export const IconPriceArea = styled.div`
  /* margin-left: 200px; */
  position: absolute;
  right: 26px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 14px;
`;

export const EditIcon = styled(Image)`
  float: right;
`;

export const ProductName = styled.h1`
  width: 100px;
  margin-top: 14px;
  margin-left: 14px;

  font-size: 2.4rem;
  white-space: nowrap;
`;

export const Date = styled.span`
  font-size: 1.6rem;
  line-height: 28px;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const Price = styled.p`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 42px;
`;
