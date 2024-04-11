import React from 'react';

import { css, styled } from 'styled-components';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'outlined' | 'outlinedRed' | 'outlinedOverlay1';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 크기
   */
  size?: ButtonSize;
  /**
   * 버튼의 스타일
   */
  variant?: ButtonVariant;
}

const sizeStyles = {
  sm: css`
    padding: 0.5rem 0.75rem;

    font-size: 0.75rem;
    font-weight: bold;

    outline: 1px solid transparent;
    outline-offset: -1px;
  `,
  md: css`
    gap: 0.625rem;

    padding: 0.75rem 1rem;

    font-size: 0.875rem;
    font-weight: bold;

    outline: 2px solid transparent;
    outline-offset: -2px;
  `,
  lg: css`
    padding: 0.875rem 1.25rem;

    font-size: 1rem; /* base-size 대신 1rem 사용 */
    font-weight: bold;

    outline: 2px solid transparent;
    outline-offset: -2px;
  `,
};

const variantStyles = {
  solid: css<{ disabled?: boolean }>`
    color: var(--color-crust);
    background-color: var(--color-lavender);
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: 0.5;
          `
        : css`
            &:active {
              background-color: var(--color-lavender-active);
            }
          `}
  `,
  outlined: css<{ disabled?: boolean }>`
    color: var(--color-text);
    border: 1px solid var(--color-lavender);
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: 0.5;
          `
        : css`
            &:active {
              color: var(--color-crust);
              background-color: var(--color-lavender-active);
              border-color: var(--color-lavender-active);
            }
          `}
  `,
  outlinedRed: css<{ disabled?: boolean }>`
    color: var(--color-text);
    border: 1px solid var(--color-red);
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: 0.5;
          `
        : css`
            &:active {
              color: var(--color-crust);
              background-color: var(--color-red-active);
              border-color: var(--color-red-active);
            }
          `}
  `,
  outlinedOverlay1: css<{ disabled?: boolean }>`
    color: var(--color-overlay1);
    border: 1px solid var(--color-overlay1);
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: 0.5;
          `
        : css`
            &:active {
              color: var(--color-crust);
              background-color: var(--color-overlay1-active);
              border-color: var(--color-overlay1-active);
            }
          `}
  `,
};

const StyledButton = styled.button<{ size: ButtonSize; variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--rounded);

  transition: all 0.2s;

  ${({ size }) => sizeStyles[size]}
  ${({ variant }) => variantStyles[variant]}
`;

export const Button: React.FC<ButtonProps> = ({
  size = 'lg',
  variant = 'solid',
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <StyledButton size={size} variant={variant} disabled={disabled} className={className} {...props}>
      {children}
    </StyledButton>
  );
};
