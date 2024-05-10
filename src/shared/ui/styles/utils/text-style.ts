import { css } from 'styled-components';

/**
 * - input을 감싸는 div에 import해 넣어서 사용하면 됨
 * - icon + input의 경우에도 이것 사용하면 됨. 물론 아주 기본적인 설정만 있어서 커스텀해줘야함.
 */
export const textLineClamp2 = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;

  -webkit-line-clamp: 2;
`;

export const backgroundClip = css`
  .background-clip-text {
    color: transparent;
    background-clip: text;
  }
`;
