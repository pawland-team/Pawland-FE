import { styled } from 'styled-components';

export const TodayChatDate = styled.div`
  user-select: none;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 149px;
  height: 38px;
  margin-inline: auto;

  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem; /* 150% */
  color: ${({ theme: { color } }) => color.gray_9E9E9E};
  text-align: center;
  letter-spacing: -0.06rem;

  background: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 57px;
`;
