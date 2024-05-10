import styled from 'styled-components';

import { dropDownMenuStyle } from '@shared/ui/styles/utils';

export const NicknameWithAvatar = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

export const NickNameImageBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  font-size: 1.6rem;
  color: #242424;
`;

export const DropDownMenu = styled.ul`
  position: absolute;
  top: 120%;
  right: 0;
  ${dropDownMenuStyle}
  width: 120px;
`;
