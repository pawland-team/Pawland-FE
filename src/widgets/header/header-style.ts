import styled from 'styled-components';

export const HeaderArea = styled.header`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.header};
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${({ theme }) => theme.header.web};

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
`;

export const NavContainer = styled.nav`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ul {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: space-between;
  }

  li {
    min-width: 120px;
    text-align: center;

    a {
      font-size: 2rem;
      font-weight: 700;
      transition: all 0.15s;

      &:hover {
        color: ${({ theme }) => theme.color.blue_43ADFF};
      }
    }

    &.disabled {
      button {
        font-size: 2rem;
        font-weight: 700;
        transition: all 0.15s;

        &:hover {
          color: ${({ theme }) => theme.color.blue_43ADFF};
        }
      }
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
