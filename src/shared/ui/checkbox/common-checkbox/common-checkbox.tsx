import { useState } from 'react';

import Image from 'next/image';

import * as S from './common-checkbox-style';

interface CommonCheckBoxProps {
  label: string;
  group: string;
  checked?: boolean;
}

/**
 *
 * @param label label , id 그리고 htmlFor에도 동시에 들어감
 * @param group checkbox를 하나로 묶어주는 역할을 하는 텍스트를 넣어야함
 * @param checked default false지만 처음부터 체크되어있어야하는 경우에만 true 사용하면 됨.
 */

const CommonCheckBox = ({ label, group, checked = false }: CommonCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChangeCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <S.CommonCheckBoxContainer>
      <input type='checkbox' name={group} id={label} checked={isChecked} onChange={handleChangeCheckBox} />
      <div className={isChecked ? 'checkbox checked' : 'checkbox'}>
        {isChecked && <Image width={11} height={9} alt='체크되었음' src='/images/icon/checkbox-checked-icon.svg' />}
      </div>
      <label htmlFor={label}>{label}</label>
    </S.CommonCheckBoxContainer>
  );
};

export { CommonCheckBox };
