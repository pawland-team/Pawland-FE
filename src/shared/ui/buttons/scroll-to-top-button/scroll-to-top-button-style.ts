import styled from 'styled-components';

export const ScrollToTopButtonBox = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
  right: 40px;
  bottom: 20%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
