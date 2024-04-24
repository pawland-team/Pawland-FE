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
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 95%;
  max-width: 1194px;
  padding: 18px 0;
`;

export const NavContainer = styled.nav`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 440px;

  ul {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }

  li {
    a {
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
`;

export const LogoBox = styled.h1`
  a {
    display: inline-block;
  }
`;

export const LinkGroupContainer = styled.div`
  display: flex;
  align-items: center;

  .link-box {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-right: 20px;
  }
`;
