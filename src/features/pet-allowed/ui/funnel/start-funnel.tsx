import { MouseEvent } from 'react';

import { CommonButton } from '@shared/ui/buttons';

import * as S from './style';

export interface OnNextProps {
  onNext: (e: MouseEvent<HTMLElement>) => void;
}

const StartFunnel = ({ onNext }: OnNextProps) => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>반려동물 동반 장소 검색 서비스</h2>
          <p>함께 방문할 수 있는 장소를 쉽게 검색해 보세요!</p>
        </div>
        <div className='funnel-button-box'>
          <CommonButton
            handleClick={onNext}
            fontSize='1.8rem'
            fontWeight='600'
            fontColor='#fff'
            backgroundColor='#43ADFF'
            padding='23px 0'
          >
            시작하기
          </CommonButton>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { StartFunnel };
