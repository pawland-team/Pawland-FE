import { styled } from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 34px;
  width: 100%;
`;

export const ChatContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 34px;

  width: fit-content;
  margin: 0 auto;

  /* padding-block: ${({ theme: { blockSize } }) => `calc(34px + ${blockSize.globalNavBar.onDesktop.height}) 58px`}; */
  padding-block: 34px 58px;
`;

export const ChatPageMeta = styled.h1`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;

  width: 240px;
  height: 52px;

  font-size: 2.8rem;
  font-weight: 700;
  font-style: normal;
  line-height: 3.8rem; /* 135.714% */
  color: #242424;
  letter-spacing: -0.06rem;
`;

export const ChatContentArea = styled.div`
  display: flex;
  column-gap: 29px;
  width: fit-content;
  margin: 0 auto;
`;

/**
 * TODO: -webkit-scrollbar 제거하고 custom scroll bar 구현하기
 * - -webkit-scrollbar는 vertical scroll bar의 높이 조절 불가능
 * - scroll bar 높이 제한하기
 * - 컨텐츠 높이와 비례하는 scroll bar와 scroll thumb 높이 구현하기
 */
export const ChatRoomPreviewListWrapper = styled.section`
  overflow-y: scroll;
  flex-shrink: 0;

  width: calc(570px + 8px + 4px); /* chatRoomPreview 너비 + padding-right너비 + scrollbar 너비 */
  height: 936px;
  max-height: 936px;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.gray_9E9E9E};
    border-radius: 18px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color.gray_F3F3F3};
    border-radius: 18px;
  }
`;
