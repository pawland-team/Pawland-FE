import styled from 'styled-components';

export const CommonCheckBoxContainer = styled.div`
  position: relative;
  display: inline-flex;
  gap: 6px;
  align-items: center;

  label {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  input {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    appearance: none;
  }

  .checkbox {
    position: relative;

    width: 20px;
    height: 20px;

    border: 1px solid #e0e0e0;
    border-radius: 4px;

    &.checked {
      background-color: ${({ theme }) => theme.color.blue_43ADFF};
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
