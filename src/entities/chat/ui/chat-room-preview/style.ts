import Image from 'next/image';
import { styled } from 'styled-components';

export const ChatPreviewWrapper = styled.button<{ $isChatRoomUnfolded?: boolean }>`
  cursor: pointer;

  display: flex;
  gap: 15px;

  /* width: 100%; */

  /* max-width: 570px; */
  width: 570px; /* scrollbar 제외한 너비 */
  min-height: 104px;
  padding: 21px 29px 15px 26px;

  background: ${({ theme: { color } }) => color.white_FFFFFF};
  background-color: ${({ theme, $isChatRoomUnfolded }) =>
    $isChatRoomUnfolded ? theme.color.gray_F9F9F9 : theme.color.white_FFFFFF};
  border-top: 0.3px solid ${({ theme: { color } }) => color.gray_F3F3F3};
  border-bottom: 0.3px solid ${({ theme: { color } }) => color.gray_F3F3F3};
`;

export const ProductImageWrap = styled.div`
  position: relative;

  overflow: hidden;
  flex-shrink: 0;

  width: 68px;
  height: 68px;

  border-radius: 50%;
`;

export const ProductImage = styled(Image)`
  object-fit: cover;
`;

export const MessageDetails = styled.div`
  width: 100%;
  padding-block: 7px 9px;
`;

export const MessageMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SenderName = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem; /* 171.429% */
  color: ${({ theme }) => theme.color.gray_9E9E9E};
  letter-spacing: -0.06rem;
`;

export const SentTime = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem; /* 171.429% */
  color: ${({ theme }) => theme.color.gray_9E9E9E};
  text-align: right;
  letter-spacing: -0.06rem;
`;

export const MessageContent = styled.p<{ $isChatRoomUnfolded?: boolean }>`
  overflow: hidden;

  max-width: 260px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.8rem; /* 175% */
  color: ${({ $isChatRoomUnfolded }) => ($isChatRoomUnfolded ? '#242424' : '#9E9E9E')};
  text-align: left;
  text-overflow: ellipsis;
  letter-spacing: -0.06rem;
  white-space: nowrap;
`;
