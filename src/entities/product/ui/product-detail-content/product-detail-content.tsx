import { useRef, useState } from 'react';

import styled from 'styled-components';

import { CommonButton } from '@shared/ui/buttons';

interface ProductDetailContentProps {
  detailContent: string;
}

const ProductDetailContent = ({ detailContent }: ProductDetailContentProps) => {
  const contentRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOpenContent = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <SContentContainer>
      <SContentBox
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: detailContent }}
        $height={isOpened ? 'auto' : '500px'}
      />
      {!isOpened && (
        <SButtonBox>
          <CommonButton
            fontSize='1.8rem'
            fontWeight='600'
            fontColor='#43ADFF'
            borderWidth='2px'
            borderColor='#43ADFF'
            backgroundColor='#fff'
            padding='23px 0'
            handleClick={handleClickOpenContent}
          >
            상품 설명 더보기
          </CommonButton>
        </SButtonBox>
      )}
    </SContentContainer>
  );
};

export { ProductDetailContent };

interface SContentBoxProps {
  $height: string;
}

const SContentContainer = styled.div`
  position: relative;
`;

const SContentBox = styled.div<SContentBoxProps>`
  position: relative;
  overflow: hidden;
  height: ${(props) => props.$height};
`;

const SButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 200px;

  background: rgb(255 255 255);
  background: linear-gradient(180deg, rgb(255 255 255 / 59.1%) 0%, rgb(255 255 255 / 100%) 73%);

  button {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
