import Image from 'next/image';
import Link from 'next/link';
import { styled } from 'styled-components';

// Gray-9E9E9E
// black
import RightAngleBracket from '@/public/images/icon/right-angle-bracket-unfilled-w24-h24.svg?component';

export const ChatRoomWrapper = styled.section`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: ${({ theme: { blockSize } }) => blockSize.chatRoom.onDesktop.width};
  height: ${({ theme: { blockSize } }) => blockSize.chatRoom.onDesktop.height};
  margin-block: 5px 20px;

  border: 2px solid ${({ theme: { color } }) => color.gray_F3F3F3};
  border-radius: 10px;
`;

export const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-height: 112px;
  padding: 23px 27px 21px 22px;

  border-bottom: 2px solid ${({ theme: { color } }) => color.gray_F3F3F3};
`;

export const ProductThumbnailBox = styled.div`
  position: relative;

  flex-shrink: 0;

  width: 68px;
  height: 68px;

  border-radius: 10px;
`;

export const ProductThumbnail = styled(Image)`
  object-fit: cover;
  border-radius: inherit;
`;

export const RightAngleBracketLink = styled(Link)`
  position: absolute;
  right: -7px;
  bottom: -2px;

  flex-shrink: 0;

  width: 24px;
  height: 24px;

  background-color: #fff;
  filter: drop-shadow(1px 1px 5.6px rgb(0 0 0 / 15%));
  border-radius: 50%;
`;

export const RightAngleBracketIcon = styled(RightAngleBracket)`
  width: 100%;
  max-width: 100%;
  height: 100%;

  object-fit: cover;

  fill: black;
`;

export const ProductMeta = styled.div`
  display: flex;
  column-gap: 12px;
`;

export const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;

  box-sizing: border-box;

  /* width: calc(12px + 274px); */

  /* 12px(padding-left) + 274px(ProductName max-width) */
  width: 274px;
  max-height: 70px;
`;

export const ProductSaleState = styled.div`
  flex-shrink: 0;

  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2.4rem; /* 171.429% */
  color: #242424;
  text-align: center;
  letter-spacing: -0.06rem;
`;

export const ProductName = styled.div`
  overflow: hidden;
  flex-shrink: 0;

  max-width: 274px;

  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem; /* 171.429% */
  color: #242424;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductPrice = styled.div`
  width: fit-content;
  max-width: 100%;
  height: 32px;

  font-family: 'Noto Sans KR', sans-serif;

  /* font-family: Pretendard; */
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem; /* 137.5% */
  color: #242424;
  letter-spacing: -0.06rem;
`;

export const ConfirmTransactionButton = styled.button`
  display: flex;
  place-self: center flex-end;
  align-items: center;
  justify-content: center;

  width: 129px;
  height: 40px;
  padding: 10px 20px;

  font-family: Pretendard, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2rem; /* 125% */
  color: ${({ theme: { color } }) => color.white_FFFFFF};
  letter-spacing: -0.06rem;

  background-color: ${({ theme: { color } }) => color.black_000000};
  border-radius: 22px;
`;

export const ChatRoomBodyWrapper = styled.div<{ $changedTextAreaHeight: number }>`
  display: flex;
  flex-direction: column;

  /* height 명시해줘야 scroll이 생김 */
  flex-grow: 1;
  justify-content: flex-end;

  width: 100%;

  /* height: 711px;
  max-height: 711px; */
  height: 799px; /* 711px + 88px */
  max-height: 799px; /* 711px + 88px */
  padding-bottom: calc(
    88px + ${({ $changedTextAreaHeight }) => $changedTextAreaHeight}px
  ); /* textarea 높이 높아지면 여기 아니면 ChatRoomBody를 높여야 함 */
`;

/**
 *  * 최신 메시지는 0번째 인덱스에 추가되는 방식이므로, flex-direction: column-reverse로 설정
 */
export const ChatRoomBody = styled.div`
  overflow: hidden scroll;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  row-gap: 24px;

  width: 100%;

  /* max-height: 100%; */
  max-height: 711px;
  padding: 14px 26.76px 14px 23px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * 날짜 표시 메시지도 포함
 */
export const MessageGroup = styled.div`
  display: flex;
  flex-direction: column-reverse;
  row-gap: 4px;

  width: 100%;
  height: fit-content;
`;

export const ModalMessage = styled.pre`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 118px;
  padding: 0 12px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { color } }) => color.black_000000};
  text-align: center;
  letter-spacing: 0.064rem;

  border: 1px solid #eee;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  height: 62px;

  button,
  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;

    max-width: 50%;
    height: 100%;

    font-size: 2rem;
    font-weight: 700;
    line-height: normal;
    color: ${({ theme: { color } }) => color.black_000000};
    text-align: center;

    &:hover {
      color: ${({ theme: { color } }) => color.white_FFFFFF};
      background: ${({ theme: { color } }) => color.blue_2087D6};
    }
  }

  & align-self:nth-of-type(1) {
    border-right: 0.5px solid #eee;
  }

  & button:nth-of-type(1) {
    border-left: 0.5px solid #eee;
  }
`;

export const ModalFooterOnelineButton = styled.button`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 2rem;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme: { color } }) => color.black_000000};
  text-align: center;

  &:hover {
    color: ${({ theme: { color } }) => color.white_FFFFFF};
    background: ${({ theme: { color } }) => color.blue_2087D6};
  }
`;
