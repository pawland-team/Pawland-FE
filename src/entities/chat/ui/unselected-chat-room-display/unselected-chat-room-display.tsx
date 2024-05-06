import * as S from './style';

export const UnselectedChatRoomDisplay = () => {
  return (
    <S.Wrapper>
      <S.SignatureLogo />
      <S.Text>상품 판매자에게 직접 메세지를 보내보세요!</S.Text>
      <S.LinkToProductPage href={'/product'}>다양한 상품 구경하러 가기</S.LinkToProductPage>
    </S.Wrapper>
  );
};
