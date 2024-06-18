import { CommonButton } from '@shared/ui/buttons';

import { FunnelComponentProps } from './select-type';
import * as S from './style';

const SelectRegion = ({ onPrev, onNext }: FunnelComponentProps) => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>방문하고자 하는 지역을 선택해 주세요.</h2>
          <p>마지막으로 지역을 선택하여 결과를 확인해 보세요!</p>
        </div>
        <div className='funnel-radio-group'>
          <div className='radio-box'>
            <label htmlFor='1'>서울</label>
            <input type='radio' id='1' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='2'>인천</label>
            <input type='radio' id='2' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='3'>대전</label>
            <input type='radio' id='3' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='4'>대구</label>
            <input type='radio' id='4' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='5'>광주</label>
            <input type='radio' id='5' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='6'>부산</label>
            <input type='radio' id='6' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='7'>울산</label>
            <input type='radio' id='7' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='8'>세종</label>
            <input type='radio' id='8' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='31'>경기</label>
            <input type='radio' id='31' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='32'>강원</label>
            <input type='radio' id='32' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='33'>충북</label>
            <input type='radio' id='33' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='34'>충남</label>
            <input type='radio' id='34' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='35'>경북</label>
            <input type='radio' id='35' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='36'>경남</label>
            <input type='radio' id='36' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='37'>전북</label>
            <input type='radio' id='37' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='38'>전남</label>
            <input type='radio' id='38' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='39'>제주</label>
            <input type='radio' id='39' name='type' />
          </div>
          {/* <BorderCheckBox label='12' group='locale-type' type='radio' value='행사' /> */}
        </div>
        <div className='funnel-button-box'>
          <div className='funnel-button-group'>
            <CommonButton
              handleClick={onPrev}
              fontSize='1.8rem'
              fontWeight='600'
              fontColor='#fff'
              backgroundColor='#9E9E9E'
              padding='23px 0'
            >
              이전
            </CommonButton>
            <CommonButton
              handleClick={onNext}
              fontSize='1.8rem'
              fontWeight='600'
              fontColor='#fff'
              backgroundColor='#43ADFF'
              padding='23px 0'
            >
              결과보기
            </CommonButton>
          </div>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { SelectRegion };
