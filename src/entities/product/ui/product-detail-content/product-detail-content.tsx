import { useEffect, useRef, useState } from 'react';

import DOMPurify from 'dompurify';
import styled from 'styled-components';

import { CommonButton } from '@shared/ui/buttons';

interface ProductDetailContentProps {
  detailContent: string;
}

const ProductDetailContent = ({ detailContent }: ProductDetailContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [textBoxHeight, setTextBoxHeight] = useState(0);

  const handleClickOpenContent = () => {
    setIsOpened((prev) => !prev);
  };

  // ? : 화면 렌더링 되기 전에 먼저 요소 높이를 측정해 버리기 때문에 항상 500px이 넘지 않는 상황.
  // setTimeout으로 해결 이게 맞나

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentTextRef.current) {
        const height = contentTextRef.current.offsetHeight;
        setTextBoxHeight(height);
      }
    }, 500); // 1초 후에 실행

    return () => clearTimeout(timer); // cleanup 함수에서 타이머 해제
  }, []); // []를 사용하여 최초 렌더링 시에만 실행되도록 설정

  return (
    <SContentContainer>
      <SContentBox ref={contentRef} $height={isOpened ? 'auto' : '500px'}>
        <STextArea
          ref={contentTextRef}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(detailContent),
          }}
        />
        {/* <STextArea ref={contentTextRef} dangerouslySetInnerHTML={{ __html: detailContent }} /> */}
        {!isOpened && textBoxHeight > 500 && (
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
