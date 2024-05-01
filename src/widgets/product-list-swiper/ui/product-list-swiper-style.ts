import styled from 'styled-components';

export const ProductListSwiperBox = styled.div`
  position: relative;
  width: 95%;
  max-width: 1194px;
  margin: 0 auto;
`;

export const NavigationLeft = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
  top: 50%;
  left: -7%;
  transform: translateY(-50%);
`;

export const NavigationRight = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
  top: 50%;
  right: -7%;
  transform: translateY(-50%);
`;
