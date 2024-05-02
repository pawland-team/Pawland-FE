import styled from 'styled-components';

export const SelectedFilterManageBoxStyle = styled.div`
  display: flex;
  gap: 8px 12px;
  align-items: center;

  padding: 10px 13px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-top: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;
