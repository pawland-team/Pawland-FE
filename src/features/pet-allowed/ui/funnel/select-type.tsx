import { MouseEvent } from 'react';

import { CommonButton } from '@shared/ui/buttons';

import * as S from './style';

export interface FunnelComponentProps {
  onPrev: (e: MouseEvent<HTMLElement>) => void;
  onNext: (e: MouseEvent<HTMLElement>) => void;
}

const SelectType = ({ onPrev, onNext }: FunnelComponentProps) => {
  return (
    <S.FunnelArea>
      <div className='funnel-container'>
        <div className='funnel-title-box'>
          <h2>방문하고자 하는 장소의 유형을 선택해 보세요.</h2>
          <p>하나의 유형을 선택해 주세요.</p>
        </div>
        <div className='funnel-radio-group'>
          {/* 12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점 */}
          <div className='radio-box'>
            <label htmlFor='12'>관광지</label>
            <input type='radio' id='12' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='14'>문화시설</label>
            <input type='radio' id='14' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='25'>여행코스</label>
            <input type='radio' id='25' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='28'>레포츠</label>
            <input type='radio' id='28' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='32'>숙박</label>
            <input type='radio' id='32' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='38'>쇼핑</label>
            <input type='radio' id='38' name='type' />
          </div>
          <div className='radio-box'>
            <label htmlFor='39'>음식점</label>
            <input type='radio' id='39' name='type' />
          </div>
          {/* <BorderCheckBox label='12' group='locale-type' type='radio' value='행사' /> */}
        </div>
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
            다음
          </CommonButton>
        </div>
      </div>
    </S.FunnelArea>
  );
};

export { SelectType };
