import styled from 'styled-components';

export const CommonCheckBoxContainer = styled.div`
  display: inline-flex;
  gap: 6px;
  align-items: center;

  label {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  input {
    display: none;
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;

    border: 1px solid #e0e0e0;
    border-radius: 4px;

    &.checked {
      background-color: ${({ theme }) => theme.color.blue_43ADFF};
    }
  }
`;
