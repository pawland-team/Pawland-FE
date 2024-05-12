import { css } from 'styled-components';

/**
 * - input을 감싸는 div에 import해 넣어서 사용하면 됨
 * - icon + input의 경우에도 이것 사용하면 됨. 물론 아주 기본적인 설정만 있어서 커스텀해줘야함.
 */
export const inputContainer = css`
  display: flex;
  gap: 10px;
  align-items: center;

  width: 100%;

  background: #fff;
  border-radius: 6px;
`;

/**
 * - input 요소에 import해서 넣어주면 스타일 초기화됨
 */
export const inputReset = css`
  width: 100%;

  font-size: 1.6rem;
  line-height: 1;

  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;
