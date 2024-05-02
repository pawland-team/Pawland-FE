import { useState } from 'react';

import * as S from './border-checkbox-style';
import { CommonCheckBoxProps } from '../common-checkbox/common-checkbox';

const BorderCheckBox = ({ label, group, checked = false }: CommonCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChangeCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <S.BorderCheckBoxContainer className={isChecked ? 'checked' : ''}>
      <div className='checkbox' />
      <label>{label}</label>
      <input type='checkbox' name={group} id={label} checked={isChecked} onChange={handleChangeCheckBox} />
    </S.BorderCheckBoxContainer>
  );
};

export { BorderCheckBox };
