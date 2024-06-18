import { CommonButton } from '@shared/ui/buttons';

import { OnNextProps } from './start-funnel';
import * as S from './style';

const FinalFunnel = ({ onNext }: OnNextProps) => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>반려동물 동반 장소 검색 결과</h2>
          <p>원하시는 검색 결과는 아래와 같습니다.</p>
        </div>
        <div>결과 리스트 보여주기</div>
        <div className='funnel-button-box'>
          <CommonButton
            handleClick={onNext}
            fontSize='1.8rem'
            fontWeight='600'
            fontColor='#fff'
            backgroundColor='#43ADFF'
            padding='23px 0'
          >
            처음부터
          </CommonButton>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { FinalFunnel };
