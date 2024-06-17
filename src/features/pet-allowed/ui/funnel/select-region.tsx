import { CommonButton } from '@shared/ui/buttons';

import * as S from './style';

const SelectRegion = () => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>방문하고자 하는 지역을 선택해 주세요.</h2>
          <p>마지막으로 지역을 선택하여 결과를 확인해 보세요!</p>
        </div>
        <div className='funnel-button-box'>
          <CommonButton fontSize='1.8rem' fontWeight='600' fontColor='#fff' backgroundColor='#43ADFF' padding='23px 0'>
            결과 보기
          </CommonButton>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { SelectRegion };
