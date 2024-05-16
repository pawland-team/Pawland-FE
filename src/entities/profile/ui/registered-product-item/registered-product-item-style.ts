import Image from 'next/image';
import styled from 'styled-components';

export const RegisteredProductItem = styled.div`
  cursor: pointer;

  display: flex;

  width: 100%;
  padding: 20px 26px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  position: relative;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const DropDownArea = styled.div`
  margin-left: 27px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const IconPriceArea = styled.div`
  /* margin-left: 200px; */
  position: absolute;
  right: 26px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const EditIcon = styled(Image)`
  float: right;
`;

export const ProductName = styled.h1`
  font-size: 2.4rem;
  margin-left: 14px;
  margin-top: 14px;
  width: 100px;
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

export const Status = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;

  border: 1px solid;
  border-color: #9e9e9e;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
