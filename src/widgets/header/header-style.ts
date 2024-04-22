import styled from 'styled-components';

export const HeaderArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  background: #fff;
  border-bottom: 1px solid #bdbdbd;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 95%;
  max-width: 1194px;
  padding: 18px 0;
`;

export const InputBox = styled.div`
  width: 100%;
  max-width: 440px;
`;

export const LogoBox = styled.h1`
  a {
    display: inline-block;
  }
`;

export const LinkGroupContainer = styled.div`
  display: flex;
  align-items: center;
`;
