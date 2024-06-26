import { useState } from 'react';

import DOMPurify from 'dompurify';
import styled from 'styled-components';

import { CommonButton } from '@shared/ui/buttons';

interface ProductDetailContentProps {
  detailContent: string;
}

const ProductDetailContent = ({ detailContent }: ProductDetailContentProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOpenContent = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <SContentContainer>
      <SContentBox $height={isOpened ? 'auto' : '200px'}>
        <STextArea
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(detailContent),
          }}
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
      </SContentBox>
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

  /* min-height: 500px; */
`;

const STextArea = styled.div`
  height: auto;
`;

const SButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 200px;

  background: rgb(255 255 255);
  background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 84.1%) 37%);

  button {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
