import { CommonButton } from '@shared/ui/buttons';

import * as S from './style';

const SelectType = () => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>방문하고자 하는 장소의 유형을 선택해 보세요.</h2>
          <p>하나의 유형을 선택해 주세요.</p>
        </div>
        <div className='funnel-radio-box'>
          <label htmlFor='12'>행사</label>
          <input type='radio' id='12' name='type' />
          {/* <BorderCheckBox label='12' group='locale-type' type='radio' value='행사' /> */}
        </div>
        <div className='funnel-button-group'>
          <CommonButton fontSize='1.8rem' fontWeight='600' fontColor='#fff' backgroundColor='#9E9E9E' padding='23px 0'>
            이전
          </CommonButton>
          <CommonButton fontSize='1.8rem' fontWeight='600' fontColor='#fff' backgroundColor='#43ADFF' padding='23px 0'>
            다음
          </CommonButton>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { SelectType };
