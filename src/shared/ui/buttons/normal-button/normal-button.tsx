import styled, { css } from 'styled-components';

type NormalButtonBackgroundColor = 'red' | 'blue' | 'green';
type NormalButtonSize = 'small' | 'medium' | 'large';

type NormalButtonProps = {
  /**
   * 버튼 배경색
   */
  backgroundColor: NormalButtonBackgroundColor;
  /**
   * 버튼 사이즈
   */
  size: NormalButtonSize;
  /**
   * 버튼 안에 들어갈 내용
   */
  children?: React.ReactNode;
  /**
   * 클릭 이벤트
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * type 속성
   */
  type?: 'button' | 'submit' | 'reset';
};

export const NormalButton = ({
  backgroundColor,
  size,
  children = '나는 버튼',
  onClick,
  type = 'submit',
}: NormalButtonProps) => {
  return (
    <S.Button type={type} onClick={onClick} $backgroundColor={backgroundColor} $size={size}>
      {children}
    </S.Button>
  );
};

const buttonSize = css<{ $size: NormalButtonSize }>`
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          width: 10rem;
          height: 3rem;
        `;
      case 'medium':
        return css`
          width: 20rem;
          height: 5rem;
        `;
      case 'large':
      default:
        return css`
          width: 30rem;
          height: 7rem;
        `;
    }
  }}
`;

const S = {
  Button: styled.button<{ $backgroundColor: NormalButtonBackgroundColor; $size: NormalButtonSize }>`
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    ${buttonSize}

    font-size: 16px;
    font-weight: 800;
    color: white;

    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border: none;
    border-radius: 8px;
    box-shadow:
      rgb(50 50 93 / 25%) 0 50px 100px -20px,
      rgb(0 0 0 / 30%) 0 30px 60px -30px,
      rgb(10 37 64 / 35%) 0 -2px 6px 0 inset;
  `,
};
